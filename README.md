# Budgie Design Notes

(To be replaced with a proper README at some point in the future.)

## 1 Data model

### 1.1 Transaction Data Model

#### 1.1.1 Core Fields

Core fields are fields that are essential to the financial integrity of the
transaction. Core fields are `dtstart` (required), `amount`, `sourceAccountId`,
`destinationAccountId`, and `sortIndex` (because it determines whether
transactions happen in the correct order).

#### 1.1.2 Metadata Fields

Metadata fields are stored to optimize the display of the transaction or
enhance human readability.  Metadata fields are `isReconciled` (required),
`label`, `notes`, `colour`, and `tags`.

#### 1.1.3 Recurrence and Inheritance Fields

Some fields are used to determine the relationship of the transaction to its
parent or dates on which to repeat. These fields are `rrule`, `exdate`, and
`parentId`.

#### 1.1.3 Transient Fields

Fields that are generated at runtime and not persisted to the database are
transient. These fields are `sortId`, `isException`, `isExcluded`, and
`recurrenceIndex`.

### 1.2 Account Data Model

Required fields for accounts are `label`, `isSource`, `isDestination`, and
`isPrimary`.

Optional fields are `institutionName`, `accountType`, `accountNumber`,
`reconciledDate`, `reconciledBalance`.


## 2 Transactions

### 2.1 Recurrence

If `rrule` is defined, the transaction is considered to be recurring.

`rrule` is an iCal config string that is deserialized into an `options` object
and passed to rrule.js to generate recurrence dates.  `options.dtstart` will be
reconstructed during deserialization from the transaction's `dtstart` field
(and removed during serialization). Dates will all be stored as UTC and
converted to local time in the browser in order to assure that every
transaction happens at midnight at local time according to the browser in which
the app is being viewed.

Transactions that are part of a recurrence (including exceptional transactions
-- see 2.4) will have an icon displayed (`glyphicon-repeat`?) to indicate that
they are part of a recurrence.

### 2.2 Exclusions

An `exdate` field will be stored on the transaction to specify a list of dates
to exclude from the recurrence. `rdate` is not required as child transactions
(see 2.3) can be used to add dates to a recurring transaction ad hoc.

Instances of recurring transactions that match an `exdate` will have
`isExcluded` set and will be hidden by default from the transaction list. A
button entitled "Show Excluded" will allow excluded transactions to be
displayed in the transaction list with a strikethrough and grey hatched
background. A button will be shown next to the excluded transaction allowing
the user to restore it.

### 2.3 Parents and Children

If `parentId` is defined, the transaction is considered to be a child.
Otherwise, it is a parent.

All fields are optional on a child transaction except `dtstart` and `parentId`.
If a field is set on the parent transaction but not the child, then the child
will inherit the value from its parent. If a field is set on both the parent
and the child, the value on the child will override the value on the parent.

A child transaction must not be recurring and it must not inherit from another
child (that is, a transaction must not be both a parent and a child).

Child transactions will show some indication that they are linked to a parent.
An icon (`glyphicon-link`?) will be displayed by the transaction which, when
hovered, will highlight any parents, children, or siblings and, when clicked,
will display them on their own page in a table. An "Unlink" option will be
provided in the transaction menu to unlink the child transaction from its
parent, creating a new independent simple transaction.

### 2.4 Exceptional Transactions

When a child of a recurring transaction falls upon one of the `exdate` values
of its parent, it can be considered an "exceptional transaction" and is
considered to be part of the recurrence. In addition to the recurrence icon
shown on all recurring transaction instances, an icon (`glyphicon-pencil`?)
will be displayed to indicate that the transaction has edits relative to the
recurring parent.

### 2.5 Reconciliation

Reconciliation will convert any instances of recurring transactions before the
end of the reconciliation date into child transactions linked to the recurring
transaction and set the `isReconciled` flag to `true` on each of them. All core
fields (see 1.1.1) will be set to override the parent transaction. Metadata
fields (see 1.1.2), may remain undefined in order to inherit from the parent.

Reconciliation will also update `dtstart` on all recurring transactions to the
first recurrence date after the reconciliation date. Garbage collection will be
performed on `exdate` values before `dtstart`. Note that because the child
transactions will no longer fall on `exdate` values, they will not be
considered exceptional transactions.

The `dtstart`, `amount`, `sourceAccountId`, and `destinationAccount` fields
will be locked from editing on reconciled transactions, and new transactions
will only be able to be created after the reconciliation date. (Both
restrictions can be overridden by the user if required.)

Reconciled transactions will display differently, either by varying background
colour or by displaying a check mark in a reconciliation column.

A "Reconcile Transactions" button will prompt the user to confirm that they
wish to mark all transactions reconciled up to the beginning of the current
day. For convenience, the prompt could include the last transaction that will
be included in the reconciliation.

### 2.6 Editing

#### 2.6.1 Editing Instances of Recurring Transactions

Editing an instance of a recurring transaction will prompt the user to specify
whether they wish to edit the recurring transaction or single transaction
instance. If the user edits the transaction instance, it will be converted to
an exceptional transaction with the modified fields set to override the parent.
According to the definition of exceptional transactions from 1.4.1, an entry
will be added to the `exdate` list of the parent transaction for the date of
the exception. It will not be possible to modify the date of an exceptional
transaction. (If the user tries to edit the date, they should be prompted to
create a copy of the transaction, on which all fields will be editable.)

When editing a child transaction, inherited fields should be indicated as
belonging to the parent to distinguish from overridden fields unique to the
child transaction.

Each field in the editing interface will show whether the value on the
exceptional transaction differs from the parent transaction. If so, a button
will be shown to revert the changes.

#### 2.6.2 Reversion of Exceptional Transactions

Exceptional transactions should offer a button to "Revert", which will undo all
edits on the transaction and restore it to an instance of the recurring
transaction. When a revert is initiated, the child transaction and `exdate`
entry will both be removed, thereby restoring the unmodified instance from the
parent.

#### 2.6.3 Editing Recurring Transactions

Editing the recurrence rule of a recurring transaction will prompt if there are
exceptional transactions that would end up would end up outside the new
recurrence rule:

> Some instances of this recurring transaction have been modified. In order to
> change the recurrence rule, the following modifications will be lost. What
> would you like to do?
>
> Continue and reset any modified transactions / Cancel

Likewise, if there are unreconciled child transactions that are not exceptional
transactions, the user should be prompted as follows:

> This recurring transaction has the following linked transactions. What would
> you like to do with them?
>
> Leave them alone / Remove them / Cancel

If the user selects the first option, some transactions may end up overlapping.

### 2.7 Duplication

Each transaction will have a "Duplicate" button which will create a copy of the
selected transaction. The user will be prompted to either create a linked copy
or an independent copy.

If the user chooses to create a linked copy and the selected transaction is a
child transaction, the new transaction will that transaction's sibling. If the
transaction is a non-exceptional instance of a recurring transaction, the new
transaction will be a child of the recurring transaction.

If the user chooses to create in independent copy, the new new transaction
dialog will open, pre-filled with the values of the selected transaction and
the `sortId` incremented by one.

### 2.8 Deletion

When deleting a transaction with children, if all children are exceptional
transactions, they should all be deleted with the parent automatically. If
there are child transactions that are NOT exceptional transactions, the user
should be prompted to either delete the child transactions or unlink them from
the parent before deleting it.

When deleting a child transaction or an instance of a recurring transaction,
the user should be prompted to either delete the single instance, or delete the
parent and all its children. If the user deletes a single instance of a
recurring transaction (not a child transaction), an entry should be added to
the `exdate` for the parent transaction on the date of the deleted transaction.

### 2.9 Sorting

The `sortIndex` field will determine the sort order for transactions on the
same date. Recurring transactions will be able to define their sort order
relative to other recurring transactions and all non-recurring transactions as
a block.

Non-recurring transactions will be able to define their sort order relative to
other non-recurring transactions on the specific date on which they occur.

* 100 <= sortIndex < 200 means "above all non-recurring transactions"
* 200 <= sortIndex < 300 is reserved for non-recurring transactions
* 300 <= sortIndex < 400 means "below all non-recurring transactions"

Numbers are between 100 and 400 for ease of sorting (no need to worry about
zero padding) and understandability (just look at the first digit to determine
where the transaction should be in the list).

Sort order will be able to be changed by editing a transaction. For recurring
transactions, all other recurring transactions will be shown in a list in the
editing window, and the transaction will be able to be dragged and dropped into
the correct order. For simple and child transactions, all other simple and
child transactions for that date will be shown in the editing window.

When a recurring transaction's `sortIndex` is changed, the `sortIndex` on all
other recurring transactions should be recalculated to ensure that there are no
conflicts. Likewise, for non-recurring transactions, `sortIndex` should be
recalculated for all non-recurring transactions falling on the same date.


## 3 Accounts

### 3.1 Deletion

Deleting an account should prompt to delete all associated transactions, if any
exist. If there are reconciled transactions associated with the account, then
the user should have to prove they are very, very sure that they want to delete
the account by typing "DELETE" in a text field.

### 3.2 Colour Coding

Account names should appear in a bubble with a coloured background (similar to
Bootstrap badges), with the colour varying according to the account's `colour`
field.


## 4 UI Considerations

### 4.1 Selection and Context Menu

When a row is clicked, it will be highlighted (perhaps using a thick coloured
border on one side) and considered selected. A hamburger menu icon will appear
in the coloured portion, and when clicked, a menu will pop out offering
contextual options (Edit, Delete, Duplicate, Unlink, Revert).

### 4.2 Recurrence Editor

An "Add Recurrence" button will open a panel where the user can specify a
recurrence rule.

#### 4.2.1 Frequency

Frequency will be able to be selected from the following options:

* Daily
* Weekly
* Monthly
* Yearly

#### 4.2.2 Interval

After selecting a frequency, the user will be presented with two options:
"Every [unit]" or "Every ____ [units]", with a number picker.

#### 4.2.3 Daily options

If the frequency is daily, there are no other options. For weekday
restrictions, frequency should be "weekly".

#### 4.2.4 Weekly options

#### 4.2.5 Monthly options

#### 4.2.6 Yearly options
