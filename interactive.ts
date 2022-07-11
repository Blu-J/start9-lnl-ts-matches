
import matches from "https://deno.land/x/ts_matches@v5.2.0/mod.ts";

// So, the task here is to convert the config rules, where we will make a check
// for the config coming in. 
// ```yaml
// ---
// - rule: '!(max-chan-size?) OR !(min-chan-size?) OR (#max-chan-size > #min-chan-size)'
//   description: "Maximum Channel Size must exceed Minimum Channel Size"
// ```

// Taken from https://github.com/Start9Labs/lnd-wrapper/blob/4c31721506d81b960e1026991465a792d43a72d3/assets/compat/config_rules.yaml


function check(configIn: Record<string, unknown>): string | void {
    /// TODO
}


const configGood = {
    'max-chan-size': 2,
    'min-chan-size': 1,
}
const configBadCheck = {
    'max-chan-size': 2,
    'min-chan-size': 3,
}
const configBadType = {
    'max-chan-size': '2',
    'min-chan-size': '1',
}
const configBadMispell = {
    'max_chan_size': 2,
    'min_chan_size': 1
}

console.assert(check(configGood) === undefined, 'Our good case should be undefined', check(configGood))
console.assert(check(configBadCheck) === `Maximum Channel Size must exceed Minimum Channel Size`, 'Our check should tell us that something is wrong', check(configBadCheck))
console.assert(typeof check(configBadType) === 'string', 'For the bad type, we should be returning an error', check(configBadType))
console.assert(check(configBadType) !== `Maximum Channel Size must exceed Minimum Channel Size`, 'The error returned from the check shouldn\'t be the same as our error', check(configBadType))
console.assert(check(configBadMispell) === `Maximum Channel Size must exceed Minimum Channel Size`, 'Misspel will count as not exist, and therefore the original error', check(configBadMispell))































































































































































// Answer body

// const {shape, number} = matches
// const matcher = shape({
//     'max-chan-size': number,
//     'min-chan-size': number,
// }, ['max-chan-size', 'min-chan-size'])
// if (!matcher.test(configIn)) return matcher.errorMessage(configIn)
// if(configIn['max-chan-size'] == null || configIn['min-chan-size'] == null || configIn['min-chan-size'] > configIn['max-chan-size'])
//     return "Maximum Channel Size must exceed Minimum Channel Size"