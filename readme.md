# `<input-duration>`

A Custom Element for `<input type="duration">`.

See https://github.com/whatwg/html/issues/5488, https://caniuse.com/?search=attachInternals.

## Attributes

- `value` (`number`): Default value of duration in seconds.
- `name` (`string`): Input name.

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
