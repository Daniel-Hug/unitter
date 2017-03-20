# Unitter
Simple, versatile unit conversion JS "class"

## Setup

Create a new instance of `Unitter`:

```js
var dataSizeUnitter = new Unitter([
	['bytes', 0.001],
	['KB', 1],
	['MB', 1000],
	['GB', 1000000]
]);
```

**Syntax: `new Unitter(unitValues);`**
- Pass an array of 2-item arrays each representing a unit.
- The first item in each should be a unit string. The second
  should be that unit's size relative to the base unit's size of 1.
- The array should be sorted by unit size in ascending order.

## Parse value

Use the `.getValue()` method to parse a string with quantity + unit and convert to any desired unit (or the base unit by default):

```js
dataSizeUnitter.getValue('1200 bytes');
    //=> 1.2 (KB = base unit)
```

**Syntax: `.getValue(numAndUnit, targetUnit);`**
- Pass a string with the quantity and unit separated by a space.
- `targetUnit` defaults to base unit if not passsed.
- Returns the new quantity for the target unit.


## Convert to optimal unit

```js
dataSizeUnitter.toUnit('1200 bytes');
    //=> "1.2 KB"
```

**Syntax: `.toUnit(num, targetUnit, fromUnit);`**
- `num` can be a string (`"<quantity> <unit>"`) such as is passed to `.getValue()` or
  a number (in which case, the base unit is assumed if `fromUnit` is not passed).
- `targetUnit` defaults to whichever gives a value closest to 1, but it will use any that
  gives a value `>= 1` before resorting to a larger unit that would give a smaller value.
