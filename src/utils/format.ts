import { FormatMoney } from "format-money-js";

const fm = new FormatMoney({
  decimals: 2,
});

const fmtMoney = function (num:number):string{
    return String(fm.from(num, { symbol: '$' }));
}

export default fmtMoney;