# Creating own component

## Prop type annotations

For making props of components that inherit from other components, like a `<LinearGradient>` and how it inherits from `<View>`, you need to use intersection types along with partials.

```javascript
export interface CSSLinearGradientProps extends Partial<LinearGradientProps> {
  children?: React.ReactNode;
  cssString: string;
}
```

Then on the component itself, you need to spread the rest of the props onto the component you're returning, allowing the normal props plus the ones you've added.

```javascript
export function CSSLinearGradient({
  children,
  cssString,
  ...props
}: CSSLinearGradientProps) {
  // gradient calc stuff here
  return (
    <LinearGradient colors={colors} {...props}>
      {children}
    </LinearGradient>
  );
}
```

## Whole

```javascript
import React from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const pattern2 =
  /^linear-gradient\(\s*(?:(\d+deg)(?:\s*,\s*))?((?:(#[a-fA-F0-9]{6}(?:\s*\d+%)?)(?:\s*,?\s*))+)\);?$/;

function parseLinearGradient(gradientString: string) {
  const matches = gradientString.match(pattern2);

  if (matches) {
    const angle = matches[1];
    const colorStops = matches[2].trim().split(/\s*,\s*/);

    return { angle, colorStops };
  }
  throw new Error("Invalid gradient string");
}

export interface CSSLinearGradientProps extends Partial<LinearGradientProps> {
  children?: React.ReactNode;
  cssString: string;
}

export function CSSLinearGradient({
  children,
  cssString,
  ...props
}: CSSLinearGradientProps) {
  const { angle, colorStops } = parseLinearGradient(cssString);

  const colors: string[] = [];
  const locations: number[] = [];

  colorStops.forEach((colorStop) => {
    const colorMatch = colorStop.match(/#[a-fA-F0-9]{6}/g);
    colors.push(colorMatch![0]);
    const locationMatch = colorStop.match(/\d+%$/g);
    if (locationMatch) {
      locations.push(parseFloat(locationMatch[0]) / 100);
    }
  });

  interface StartAndEnd {
    start?: { x: number; y: number };
    end?: { x: number; y: number };
  }

  //   left to right by default
  const angleObj: StartAndEnd = {
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  };

  if (angle) {
    const gradientAngle = parseFloat(angle);
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const diagonal = Math.sqrt(
      windowWidth * windowWidth + windowHeight * windowHeight
    );
    const radian = ((gradientAngle + 90) * Math.PI) / 180;
    const endX = Math.round(diagonal * Math.cos(radian));
    const endY = Math.round(diagonal * Math.sin(radian));

    const startX = 0.5 + endX / diagonal / 2;
    const startY = 0.5 + endY / diagonal / 2;
    const endXRatio = -endX / diagonal;
    const endYRatio = -endY / diagonal;
    // get crazy start and end calculations
    const start = { x: startX, y: startY };
    const end = { x: startX + endXRatio, y: startY + endYRatio };
    angleObj.start = start;
    angleObj.end = end;
  }

  // only add locations if colors.length === locations.length
  const locationsObj: { locations?: number[] } = {};
  if (colors.length === locations.length) locationsObj.locations = locations;

  return (
    <LinearGradient colors={colors} {...props} {...locationsObj} {...angleObj}>
      {children}
    </LinearGradient>
  );
}
```

# GAME app UI

## Shadows on ScrollView and Image overlay

### Shadows

Make sure to add lots of padding on the `contentContainerStyle` prop to allow room for the shadows to grow, because shadows are clipped by default in a `<ScrollView>` component.

- `contentContainerStyle={{padding: 24}}` is good enough padding for the shadows to show, apply on the `<ScrollView>` component.
- Make sure to always apply a background color on any component that has a shadow styling, otherwise the shadow won't show. Also, the shadow won't render properly on an semitranparent background color, so make sure to use a solid color.

```javascript
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{
    padding: 24,
  }}
>
  {featured.map((game) => (
    <FeaturedGame game={game} key={game.title} />
  ))}
</ScrollView>
```

### Image overlay

Here is the basic structure of an image overlay with a gradient:

```text
<View> - relatively positioned
  <Image> - full height and width
  <LinearGradient> - absolutely positioned, full height and width
```

```javascript
const FeaturedGame = ({ game }: { game: FeaturedGame }) => (
  // background color is required for shadow to show
  <View
    className="w-80 h-60 mr-4 relative bg-white rounded-2xl"
    style={shadow_styles.shadow_lg}
  >
    <Image
      source={game.image as ImageSourcePropType}
      className="w-full h-full rounded-2xl"
    />
    <LinearGradient
      {...fromCSS(`linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.4));`)}
      className="absolute w-full h-full rounded-2xl"
    ></LinearGradient>
  </View>
);
```

## React Native star rating

The `react-native-star-rating` package is a good one to use for star ratings. All we have to do is to set a few props and we can render out a star rating.

```bash
npm i react-native-star-rating
npm i -D @types/react-native-star-rating
```

```javascript
import StarRating from "react-native-star-rating";

<StarRating
  disabled={false}
  maxStars={5}
  rating={game.stars}
  starSize={16}
  fullStarColor="#FFD700"
  emptyStarColor="white"
/>;
```

- `maxStars` : the number of stars to render
- `rating` : the number of stars to fill
- `starSize` : the size of each star
- `fullStarColor` : the color of the filled stars
- `emptyStarColor` : the border color of the empty stars

## Gradient button

```javascript
<TouchableOpacity>
  <LinearGradient
    {...fromCSS(
      `linear-gradient(-90deg, rgba(58,131, 244, 0.9), rgba(9,181,211, 0.9));`
    )}
    className="rounded-full px-6 py-2"
    style={shadow_styles.shadow_subtle}
  >
    <Text className="text-white font-semibold">play</Text>
  </LinearGradient>
</TouchableOpacity>
```

- Any container styles should be applied on the inner container linear gradient, like `border-radius`, `shadow`, and `padding`.
- The `<TouchableOpacity>` needs to be the outer container so its hitbox is largest.

## Social buttons

```javascript
<View className="flex-row justify-around">
  <TouchableOpacity
    className="bg-white p-2 rounded-full"
    style={shadow_styles.shadow_md}
  >
    <Ionicons name="logo-google" size={40} color={colors.purple["400"]} />
  </TouchableOpacity>
  <TouchableOpacity
    className="bg-white p-2 rounded-full"
    style={shadow_styles.shadow_md}
  >
    <Ionicons name="logo-apple" size={40} color={colors.yellow["400"]} />
  </TouchableOpacity>
  <TouchableOpacity
    className="bg-white p-2 rounded-full"
    style={shadow_styles.shadow_md}
  >
    <Ionicons name="logo-facebook" size={40} color={colors.blue["400"]} />
  </TouchableOpacity>
</View>
```
