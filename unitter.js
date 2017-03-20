var Unitter = (function() {
	//  - Pass an array of 2-item arrays each representing a unit.
	//  - The first item in each should be a unit string and the second
	//    should be that unit's size relative to the base unit's size of 1.
	//  - The array should be sorted by unit size in ascending order.
	function Unitter(unitTuples) {
		this.unitValues = {};
		this.units = [];

		for (var i = 0; i < unitTuples.length; i++) {
			var unitTuple = unitTuples[i];
			var unit = unitTuple[0];
			var num = unitTuple[1];
			this.unitValues[unit] = num;
			this.units.push(unit);
		}
	}

	//  - Pass a string with the quantity and unit separated by a space.
	//  - targetUnit defaults to base unit if not passsed.
	Unitter.prototype.getValue = function(numAndUnit, targetUnit) {
		var parts = numAndUnit.split(' ');
		var num = parts[0];
		var unit = parts[1];
		var baseNum = fixProduct(num * this.unitValues[unit]);
		return targetUnit ? fixProduct(baseNum / this.unitValues[targetUnit]) : baseNum;
	};

	//  - num can be a string ("<quantity> <unit>") such as is passed to .getValue() or
	//    a number in which case the base unit is assumed if fromUnit is not passed.
	//  - targetUnit defaults to whichever gives a value closest to 1, but it will use any that
	//    gives a value >= 1 before resorting to a larger unit that would give a smaller value
	Unitter.prototype.toUnit = function(num, targetUnit, fromUnit) {
		if (typeof num === 'string') num = this.getValue(num);

		if (!targetUnit) {
			for (var i = this.units.length; i--;) {
				targetUnit = this.units[i];
				if (num / this.unitValues[targetUnit] >= 1) break;
			}
		}

		if (fromUnit) num = fixProduct(num * this.unitValues[fromUnit]);

		return fixProduct(num / this.unitValues[targetUnit]) + ' ' + targetUnit;
	};

	function fixProduct(num) {
		return Number(num.toPrecision(12));
	}

	return Unitter;
})();