# Budget Bakery

### Reflection

For this project I wanted to recreate one of my previous projects as closely as possible using react. https://github.com/ScottGreenhalgh/week03-assignment. Retaining all the existing features.

To start this process I took a look towards the existing HTML and decided how I would segment the page into seperate components. Since my original structure kept the different elements nicely commented I was able to initially seperate the page into 4 distinct segments, header, left sidebar, main and right sidebar. From here I needed to work out what further components were needed within these. I decided that any components that were previously created using HTML would be handled within their own components. Starting in the right sidebar where the api would pull all the data related to upgrades, I outlined what the original generated HTML would look like and returned this. I then created a styles folder and created a css file corresponding to each of my components and imported them to their corresponding name. I then went through the same process as the HTML but this time for CSS, segmenting the styling to the relevant elements.

#### API Handling

Initially I decided that fetching from the API would be handled down here. I used the useState functions from the react library to update the page upon fetch and useEffect to ensure that this call was only processed a single time. After correctly applying this information to the page, I realised that other components would need access to this data, so I moved the fetch request from the right sidebar to the App.jsx component. I then found that this is unnecessarily passing the data through components that don't need access to the information. From here I offloaded this fetch request to a seperate utils folder which I could import as and when I needed it. At this time I also created a couple other utility functions that I would need during the project. This included a number formatter (adding commas for every 3 numerical characters improving readability) and a delay function which I would later use to handle the save function and any potential animations down the line.

#### Button functionality

From here I wanted to get a few of the buttons to operate so I turned my attention to main, specifically the cookies notice. I created a seperate component for this to segment the logic. Using my knowlege of `useState` and `useEffect` I began to translate my original logic from my week03 project to something React can read. In that project I was displaying the tracking cookies notice by toggling between the style display none when the cookies were present. Render doesn't dynamically update in the same way. I started by creating two functions to handle the original cookie creation logic which remains the same. I then created an array for useState and used a boolean to track whether it should or shouldn't display, defaulting to true. From here if any of the buttons are pressed, the value can be set to false and a rerender can be triggered. Then I simply created an if statement to return early with null if the visibility was set to false. This prevents any of the html elements from appearing on the page. After this I created a useEffect with an empty array parameter, allowing it to run only on the initial render. Inside here I placed an if statement that checks if either of the created cookies are present using the or (`||`) operator and setting the visibility to false if they're present.

Next I moved to the header to handle the logic for the darkmode toggle button. Since I applied ids to each div element corresponding to each element, I first created a function to select each of these elements. I then used `.classList.toggle()` to toggle between my alternative style options in a very similar way to my original project. I then created another function that would call this function and create cookies to track the selection. Using the not operator (`!`) I can easily toggle between the two cookie options of true and false. I did knowever need this to rerender on the page, so I once gain needed to use `useState` and `useEffect`. I created another useState array using a boolean value and brought those into my toggle function. Next I needed to track whether the cookie was present on page load and utilised useEffect to do this again using another empty array to execute a single time. Next I would find if the cookie was present, if it was I would toggle the value of darkmode applying it on the initial render.

#### The cookies values

I next wanted a way of tracking the total number of cookies, but also needed this information to be shared with many locations on the page. For this reason I placed a useState array inside the top level component of App.jsx. I then used props to pass this information down to the lower level components. In the LeftSidebar.jsx I created a simple function that incremented the count by 1 and applied this to the big cookie image element using `onClick=`. Next I created a useEffect that set an interval to increment the cookie count every 1000ms by the current cps \* 1. Under the useEffect array I returned a cleanup function preventing strange operations with the renderer and the increments.

#### Prop Drilling

From here I wanted to optimise the way in which the data is passed between the upper and lower level components. My current method involves prop drilling, where the props are passed all the way down from the top level down the chain to any components much lower that need it, passing through components along the way that simply do not. To improve this structure I did a little research into something called `createContext`. This allowed me to pass props to components directly, avoiding the component chain completely. At this stage my app looked like the following

```jsx
function App() {
  let [count, setCount] = useState(0);
  let [cps, setCps] = useState(0);

  return (
    <div className="container" aria-live="polite">
      <Header />
      <LeftSidebar count={count} setCount={setCount} cps={cps} />
      <Main />
      <RightSidebar />
    </div>
  );
}
```

After incorporating createContext I was able to modify this layout of App to the following:

```jsx
function App() {
  return (
    <AppProvider>
      <div className="container" aria-live="polite">
        <Header />
        <LeftSidebar />
        <Main />
        <RightSidebar />
      </div>
    </AppProvider>
  );
}
```

Using the context utility:

```jsx
export function AppProvider({ children }) {
  const [count, setCount] = useState(0);
  const [cps, setCps] = useState(0);

  return (
    <AppContext.Provider value={{ count, setCount, cps, setCps }}>
      {children}
    </AppContext.Provider>
  );
}
```

Then in the LeftSidebar.jsx, instead of using the props as follows:
`function LeftSidebar({ count, setCount, cps })`
I would leave this field blank and create a const to use the AppContext instead.
`const { count, setCount, cps } = useContext(AppContext);`

This structure improves the overall flow of data between the components.

### Bugs and Issues

One issue I encountered that left me a little confused for a while was that onClick cannot be applied directly to component children, for example, when I did the following under Upgrades.jsx:

```jsx
<div id="upgrades-container">
  {upgrades.map((upgrade) => (
    <IndividualUpgrade
      key={upgrade.id}
      upgrade={upgrade}
      onClick={() => clickedUpgrade(upgrade.id)}
    />
  ))}
</div>
```

This left me scratching my head for a while trying to figure out why it wasn't working, but then I realised I needed to pass the onClick as a prop to IndividualUpgrade and apply it to the div of the element I wanted to create the click event listener on.

The biggest issue however, was when I was rendering the CurrentUpgradesInfo.jsx onto the screen. When gathering everything I needed to have on screen at any given time I was using `upgradeAmounts[upgrade.id - 1]` however when writing this out I instead wrote `[upgrade.id = 1]` which took me a good hour of trying to find the issue to notice.
