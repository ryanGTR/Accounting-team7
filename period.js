export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(budget) {
        let overlappingEnd;
        let overlappingStart;
        if (budget.yearMonth === this.start.format('YYYYMM')) {
            overlappingEnd = budget.lastDay();
            overlappingStart = this.start;
            // return overlappingEnd.diff(overlappingStart, 'day') + 1;
        } else if (budget.yearMonth === this.end.format('YYYYMM')) {
            overlappingEnd = this.end;
            overlappingStart = budget.firstDay();
            // return overlappingEnd.diff(overlappingStart, 'day') + 1;
        } else {
            overlappingEnd = budget.lastDay();
            overlappingStart = budget.firstDay();
        }
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }

}