// deno-fmt-ignore-file
import matches from "https://deno.land/x/ts_matches@v5.2.0/mod.ts";
/*
 *  Let us start with why,
 * There are times when we are writing a function that will take in input, in our case we know we are getting an object from our config file,
 * But beyond that we don't know much more.
 * We could cast the input, and typescript will not complain, and we will live on our happy ways
 *
 */

/// This is what our api says it will send us
type ContractsCallingConfig = Record<string, unknown>;

// This is what we think the config has
const whatWeThinkTheConfigShouldBe = {
  name: "lnd",
  retainBlocks: 2,
};

type ExpectedType = {
  name: string;
  retainBlocks: number;
};

/// This is our function
function checkConfig(input: ContractsCallingConfig) {
  const config = input as ExpectedType;
  if (config.retainBlocks + 5 > 10) {
    return "Retaining too many";
  }
}

/// We assert that we are not beyond our 10 with the operation
console.assert(
  checkConfig(whatWeThinkTheConfigShouldBe) !== "Retaining too many",
);

































































/*
 * This is fine when things go our way, but what happens if things are
 */
// One of the possible configs
const possibleConfig = {
  name: "lnd",
  retainBlocks: "2",
};

/// Notice this should be like the other, but now we are getting a weird logic error
console.assert(checkConfig(possibleConfig) === "Retaining too many");

























































































/* Now for where ts-matches comes in.
 * With ts matches we are going to validate the type coming in.
 * Also with ts matches we can generate a type from the validator instead of just casting and assuming they match.
 */

const { shape, string, number } = matches;
/// We convert the type ExpectedType into a matcher

const configMatcher = shape({
  name: string,
  retainBlocks: number,
});

type MatchedType = typeof configMatcher._TYPE;

/// Now we use the matcher to check the type
function checkConfig2(config: ContractsCallingConfig) {
  if (!configMatcher.test(config)) {
    return "Input is the wrong shape";
  }
  if (config.retainBlocks + 5 > 10) {
    return "Retaining too many";
  }
}

/// Runs the same on the old config
console.assert(
  checkConfig2(whatWeThinkTheConfigShouldBe) !== "Retaining too many",
);

/// We can escape knowing the shape is wrong
console.assert(
  checkConfig2(possibleConfig) ===
    `Input is the wrong shape`,
);
































































/*
* Now if we wanted to get an error message from the parser, we can get that from our parser
*/

/// Now we use the matcher to check the type
function checkConfig3(config: ContractsCallingConfig) {
    if (!configMatcher.test(config)) {
      return configMatcher.errorMessage(config);
    }
    if (config.retainBlocks + 5 > 10) {
      return "Retaining too many";
    }
  }
  
/// We can escape knowing the shape is wrong
console.assert(
    checkConfig3(possibleConfig) === `["retainBlocks"]number("2")`,
  );
  
/// And the messages we get back are in the shape of  `<path><checker>(<whatValueWasWrong>)`

















































































/// Now, if we wanted to throw and error, there is another function to know to make things easier and that is unsafeParse
/// but we need to deal with a thrown error, hence the name usafe case

function checkConfigUnsafe(input: ContractsCallingConfig) {
    try {
      const config = configMatcher.unsafeCast(input);
      if (config.retainBlocks + 5 > 10) {
        return "Retaining too many";
      }
    } catch (e) {
      return e.message;
    }
  }

/// But on the weird shape, now are told that it is weird
console.assert(
    checkConfigUnsafe(possibleConfig) ===
      `Failed type: ["retainBlocks"]number("2") given input {"name":"lnd","retainBlocks":"2"}`,
  );
