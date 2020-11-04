const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let tray;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  //   win.loadFile('index.html')
  // checks if is in development, if true, run local host, if false, run build/index.html
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // hide window if user clicks on another window
  win.on("blur", () => {
    win.hide();
  });

  // Open the DevTools.
  // win.webContents.openDevTools()

  // system tray
  const createTray = () => {
    // icon goes here
    // if program is running on win, use windows icon, else use template
    const iconName =
      process.platform === "win32" ? "shIconx2.png" : "shIcon.png";
    const iconPath = path.join(__dirname, `../src/assets/${iconName}`);
    tray = new Tray(iconPath);

    // tooltip on hover
    tray.setToolTip("Stay Hydrated");

    // toggle window through sys tray on left click
    tray.on("click", (event, bounds) => {
      // click even bounds
      const { x, y } = bounds;

      // window height and width (useful if i ever want to allow users to resize window)
      const { height, width } = win.getBounds();
      // console.log(bounds.x, bounds.y);
      if (win.isVisible()) {
        win.hide();
      } else {
        // sets y position based on user OS
        // if OSX, place window under icon
        // if !OSX, place window above icon
        const yPosition = process.platform === "darwin" ? y : y - height;
        // set window under or above sys tray icon
        win.setBounds({
          x: x - width / 2,
          y: yPosition,
          height,
          width,
        });
        win.show();
      }
    });

    // right click - quit option
    tray.on("right-click", () => {
      const menuConfig = Menu.buildFromTemplate([
        {
          label: "About",
          click: () => {
            require("electron").shell.openExternal(
              "https://github.com/jpilapil/stay-hydrated/blob/master/README.md"
            );
          },
        },
        { type: "separator" },
        {
          label: "Quit Hydrating",
          click: () => app.quit(),
          accelerator: "CmdOrCtrl+Q",
        },
      ]);

      tray.popUpContextMenu(menuConfig);
    });
  };

  return createTray();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow);
app.on("ready", () => {
  createWindow();
});
