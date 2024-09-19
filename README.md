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

#### Local storage & Click events

I then turned my attention to saving the game. This was an interesting piece to handle. Since I imagined this part wouldn't need to upgdate the rendered image I initially assumed I could handle most of this in normal javascript. This is therefore how I started. I then realised that to pass the value of the current count to the save function I needed to do some interesting tricks. I first grabbed my original loadProgress() function, removed the function and encapsulated its contents in a useEffect. From here I passed the parameter of setCount.

To actually save the data was slightly more difficult. I first needed an array to read data from to store. For this I created a utility called activeUpgrades.js and exported an array containing 10 zeros (one for each upgrade). I then moved to the Upgrades.jsx component and handled what would happen upon click. I created a function called clickedUpgrade() and passed an id. This would defined which button was clicked and select which position in the array I was writing to. I first needed to filter out a condition the clicked element wasn't an upgrade. I then filtered another condition where there is an insufficient count. From here I would subtract the cost from the count and add the upgrade to the array.

With data storing in the array I focused my attention back to saving the data to local storage. I started this segment by once again using my saveProgress function from week03 project. I then created a setInterval function and encapsulated inside a useEffect and returning through a clearInterval to avoid strange behaviour. It was here I noticed that I cannot simply call my save function directly inside here, and instead needed to use something known as `useCallback`, providing it with the parameter count. Assigning this all to a function called callbackSave I was able to finally call the function and save the progress to local storage. Combined with the previously created method of loading from local storage, this appeared to work as intended.

#### CPS integration

I now needed to integrate the cps into my calculations for cookie generation. By using the stored values inside. To begin this process I navigated back to LeftSidebar.jsx and imported both the activeUpgrades.js and api.js so this data became avaliable. I needed data on both how many of each upgrade had been purchased (the upgradeAmounts array) and how much these upgrades increment the count (using upgrades.increase). I then tackled the logic surrounding how the count is defined. Here I will use both setCps and setCount to define what these values will evenually be. I then ran a for loop to loop over the array based on its total length, pulling values from the api while doing so. I then defined the new cps to be the result of `upgradeAmounts[i] * upgrades[i].increase` and the new count to be `prevCount + newCps` Then I wrapped this in the existing setInterval to update the count every second based on the upgrades avaliable at that time.

#### Optimising API calls

After completing yet another api import to complete basic functionality of the game, I noticed that retriveing the API in three different components on my page caused a lot of requests. Currently this stands at 4 requests per call which is way more than I intended. By opting to avoid prop drilling I created a now problem, one that needed resolving. I attempted to resolve this by creating a new useState for each api fetch request that would track whether or not an API call had already happened. In doing so, I dropped the total number of API calls down from 4 each to 2 each. Still slightly higher than desirable but a step in the right direction.

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

By far the biggest issue I ran into was when I was rendering the CurrentUpgradesInfo.jsx onto the screen. When gathering everything I needed to have on screen at any given time I was using `upgradeAmounts[upgrade.id - 1]` however when writing this out I instead wrote `[upgrade.id = 1]` which took me a good hour of trying to find the issue to notice. Because I fixed this value at 1 I was getting a warning in console that the key values of multiple elements were the same, when I inspected, each element had the id of 1. I had absolutely no idea how this could've possibly happened for the best part of an hour. I compared exactly what I did with the example covered during the workshops which did look slightly different at first, but I remedied any typos here relatively quickly, but this didn't resolve the problem. I then replaced the entirety of CurrentUpgradesInfo with IndividualUpgrades and noticed that this part rendered completely fine. This is when I knew the issue was either with my activeUpgrades.js, my props or the elements returned by CurrentUpgradesInfo. So I decided to delete everything in the CurrentUpgradesInfo and create it from scratch. While slowly rebuilding the returned HTML I noticed the typo, resolving the frustrating problem.
