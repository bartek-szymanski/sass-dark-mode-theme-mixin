# Light & Dark Mode Theming for Legacy Projects with Sass Mixins ✨

Designed specifically for projects not originally built with **dark mode** in mind, these Sass mixins provide a lightweight and efficient way to implement this important UX feature.

With these powerful **Sass mixins**, you can seamlessly add **light and dark mode** functionality without major code changes.

It's time to embrace better accessibility, and upgrade your users' experience!

## Define colors for the light and dark theme

```scss
.button {
    @include theme(
        $background-color: (
            // property
            white,
            // light theme
            black,
            // dark theme
        )
    );
    @include theme(
        $color: (
            black,
            white,
        )
    );
    @include theme(
        $border-color: (
            black,
            white,
        )
    );
}
```

## Sass Mixins

```scss
// @param {string} $property : color, bg-color, fill, bg-img, border-color, box-shadow

@mixin cssProperty($property) {
    $property-value: var(--#{$property});

    // Define shortcuts for long properties such as `background-color` and `background-image`.
    @if $property == 'bg-color' {
        background-color: $property-value;
    } @else if $property == 'bg-img' {
        background-image: url($property-value);
    } @else {
        // Set other properties normally.
        #{$property}: $property-value;
    }
}

// Mixin to define theme-specific CSS variables
// @param {list} $properties-list :

@mixin theme($properties-list...) {
    // Process the list of property-color pairs.
    $properties: meta.keywords($properties-list);

    @each $property, $color in $properties {
        $color1: list.nth($color, 1);
        $color2: list.nth($color, 2);

        // Define CSS custom property for light theme at root scope.
        @at-root #{selector.nest(':root .theme--light', &)} {
            @content;
            --#{$property}: #{$color1};
        }

        // Define CSS custom property for dark theme at root scope.
        @at-root #{selector.nest(':root .theme--dark', &)} {
            @content;
            --#{$property}: #{$color2};
        }

        @include cssProperty($property);
    }
}
```

## Demo

https://codepen.io/astro87/pen/XWEoqva

---

This Sass dark mode project was originally developed and used within the Kwiziq project, an AI language learning platform. Kwiziq prioritizes accessibility and a user-friendly experience for all, and adding light and dark mode was a natural step in achieving that goal. We believe this project can be beneficial to other projects as well, making them more accessible and adaptable to user preferences.

Kwiziq
https://french.kwiziq.com/
