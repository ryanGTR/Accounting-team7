import dayjs from "dayjs";

const yearBudget = {
    "202101": 31,
    "202102": 280,
    "202103": 3100,
    "202104": 30,
    "202105": 310,
    "202106": 3000,
    "202107": 0,
    "202109": 30,
    "202110": 310,
    "202111": 3000,
    "202112": 31
}

export class Accounting {

    totalAmount(s, e) {
        let start = dayjs(s);
        let end = dayjs(e);
        if (end.isBefore(start)) {
            return 0;
        }
        const diffDays = end.diff(start, 'day') + 1;
        if (start.month() === end.month()) {
            return this.sameMonth(start, diffDays);
        }
        //先取得中間完整月份的預算
        const middleMonthDiff = end.diff(start, 'month');
        let totalAmount = 0;

        // for (let i = 0; i <= middleMonthDiff + 1; i++) {
        let currentMonth = start;
        while (end.add(1, 'month').date(1).isAfter(currentMonth)) {
            // const currentMonth = start.add(i, 'month');
            if (currentMonth.format('YYYYMM') === start.format('YYYYMM')) {
                const startToEnd = dayjs(start).daysInMonth();
                const firstMonthDays = startToEnd - start.get('date') + 1;
                const firstBudget = this.sameMonth(start, firstMonthDays);
                totalAmount += firstBudget;
            } else if (currentMonth.format('YYYYMM') === end.format('YYYYMM')) {
                //計算前後半段的額度
                const endBudget = this.sameMonth(end, end.get('date'));
                totalAmount += endBudget;
            } else {
                const nextBudget = this.sameMonth(currentMonth, currentMonth.daysInMonth());
                totalAmount += nextBudget;
            }
            currentMonth = currentMonth.add(1, 'month');
        }
        return totalAmount;

    }

    sameMonth(month, diffDays) {
        const days = dayjs(month).daysInMonth()
        const originData = yearBudget[month.format('YYYYMM')];
        if (!originData) {
            return 0;
        }
        return originData / days * diffDays;
    }
}
