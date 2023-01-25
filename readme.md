# `<input-duration>`

A Custom Element for `<input type="duration">`.

References:

- https://github.com/whatwg/html/issues/5488
- https://caniuse.com/?search=attachInternals
- https://wpt.fyi/results/custom-elements/HTMLElement-attachInternals.html
- https://github.com/tc39/proposal-intl-duration-format

## Attributes

- `max` (`number`): Max value of duration in seconds.
- `name` (`string`): Input name.
- `value` (`number`): Default value of duration in seconds.

## Shadow Parts

- `::part(input)`: Input.
- `::part(divider)`: Divider (`:`).

## Methods

- `inputDuration.value = number` sets duration value to number in seconds.
- `inputDuration.value` gets duration value to number in seconds.

## Events

- `change` fires when duration value changes.

## Todo

- Support `min`
- Validation
