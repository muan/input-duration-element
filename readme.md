# `<input-duration>`

A Custom Element for `<input type="duration">`.

References:

- Browser support
  - Stable: https://wpt.fyi/results/custom-elements/HTMLElement-attachInternals.html?label=master&label=stable&aligned&view=subtest
  - Experimental: https://wpt.fyi/results/custom-elements/HTMLElement-attachInternals.html
  - https://webkit.org/blog/13703/release-notes-for-safari-technology-preview-162/
- Web standards
  - https://github.com/whatwg/html/issues/5488
  - https://github.com/tc39/proposal-intl-duration-format

## Usage

```html
<!-- Include `InputDurationElement` -->
<script src="https://unpkg.com/input-duration-element@0.0.4" type="module"></script>

<!-- Render `<input-duration>` -->
<label for="duration">Duration</label>
<input-duration id="duration" name="duration"></input-duration>
```

## Attributes

- `max` (`number`): Max value of duration in seconds.
- `name` (`string`): Input name.
- `value` (`number`): Default value of duration in seconds.

## Shadow Parts

- `::part(divider)`: Divider (`:`).

## Slots

- `hour`: Default to `:`.
- `minute`: Default to `:`.
- `second`:  Default to empty.

## Methods

- `inputDuration.value = number` sets duration value to number in seconds.
- `inputDuration.value` gets duration value to number in seconds.

## Events

- `change` fires when duration value changes.

## Todo

- Support `min`
- Validation
- Figure out `maxLength`, `max`, `size`.
