
import matches from "https://deno.land/x/ts_matches@v5.2.0/mod.ts";

// So, the task here is to convert the config rules, where we will make a check
// for the config coming in. 
// ```yaml
// ---
// - rule: '!(max-chan-size?) OR !(min-chan-size?) OR (#max-chan-size > #min-chan-size)'
//   description: "Maximum Channel Size must exceed Minimum Channel Size"
// ```

// Taken from https://github.com/Start9Labs/lnd-wrapper/blob/4c31721506d81b960e1026991465a792d43a72d3/assets/compat/config_rules.yaml


function check(configIn: Record<string, unknow>): string | void {
    /// TODO
}


const configGood = {
    'max-chan-size': 2,
    'min-chan-size': 1,
}
const configBadCheck ={
    'max-chan-size': 2,
    'min-chan-size': 3,
}
const configBadType ={
    'max-chan-size': '2',
    'min-chan-size': '1',
}
const configBadMispell ={
    'max_chan_size': 2,
    'min_chan_size': 1
}

console.assert(check(configGood) === undefined)
console.assert(check(configBadCheck) === `Maximum Channel Size must exceed Minimum Channel Size`)
console.assert(typeof check(configBadType) === 'string' && check(configBadType) !== `Maximum Channel Size must exceed Minimum Channel Size`)
console.assert(check(configBadMispell) === `Maximum Channel Size must exceed Minimum Channel Size`)































































































































































// Answer body

// const {shape, number} = matches
// const matcher = shape({
//     'max-chan-size': number,
//     'min-chan-size': number,
// }, ['max-chan-size', 'min-chan-size'])
// if (!matcher.test(configIn)) return matcher.errorMessage(configIn)
// if(configIn['max-chan-size'] == null || configIn['min-chan-size'] == null || configIn['min-chan-size'] > configIn['max-chan-size'])
//     return "Maximum Channel Size must exceed Minimum Channel Size"