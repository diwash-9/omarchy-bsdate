import QtQuick
import Quickshell
import Quickshell.Io
import qs.Commons
import qs.Ui
import "BSDate.js" as BS

// Bikram Sambat date widget for the Omarchy bar.
// Sits beside omarchy.clock (AD) so English and Nepali dates show side by
// side — clicking each one opens its respective calendar:
//   omarchy.clock left-click -> AD month grid, this widget left-click -> BS one.
// Left click reveals the BS calendar, right click toggles the bar label
// between Roman and Devanagari, middle click opens a full Patro outside.
BarWidget {
  id: root
  moduleName: "draj.bsdate"

  property date displayDate: clock.date

  readonly property var bs: BS.bsForDate(displayDate)
  readonly property string mode: setting("mode", "roman")
  readonly property bool nepali: mode === "nepali"

  readonly property string displayText: {
    if (!root.bs) return "BS --";
    if (root.vertical) {
      if (root.nepali) return BS.toDevanagari(root.bs.day) + "\n" + BS.MONTH_NE[root.bs.month - 1].substring(0, 3) + "\n" + BS.toDevanagari(root.bs.year).slice(-2);
      return root.bs.day + "\n" + BS.MONTH_EN_SHORT[root.bs.month - 1] + "\n'" + String(root.bs.year).slice(-2);
    }
    return root.nepali ? BS.formatNepali(root.bs) : BS.formatRoman(root.bs);
  }

  function refresh() {
    displayDate = new Date()
    if (panelLoader.item && panelLoader.item.refresh) panelLoader.item.refresh()
  }

  // Right-click walks Roman <-> Devanagari and writes the result back to
  // shell.json, mirroring how omarchy.clock cycles its label formats.
  function cycleMode() {
    var next = root.nepali ? "roman" : "nepali"
    var entry = { id: root.moduleName }
    for (var key in root.settings)
      if (key !== "id") entry[key] = root.settings[key]
    entry["mode"] = next

    root.settings = entry
    if (root.bar && root.bar.shell && typeof root.bar.shell.updateEntryInline === "function")
      root.bar.shell.updateEntryInline(root.moduleName, entry)
  }

  function openFullPatro() {
    if (!root.bar || typeof root.bar.run !== "function") return;
    // Prefer an offline TUI if installed, else fall back to Hamro Patro in browser.
    root.bar.run("sh -c '((command -v npltz >/dev/null && omarchy-launch-floating-terminal-with-presentation \"npltz; read -n1 -s -r -p \\\"Press any key...\\\"\") || (command -v nepcal >/dev/null && omarchy-launch-floating-terminal-with-presentation \"nepcal; nepcal date; read -n1 -s -r -p \\\"Press any key...\\\"\") || xdg-open \"https://www.hamropatro.com/calendar/\" >/dev/null 2>&1) &'");
  }

  // ---- Calendar popup. Same shape contract as omarchy.clock so
  //      Bar.findPanelWidget routing (open/close/opened) keeps working.
  readonly property bool opened: panelLoader.item ? panelLoader.item.opened === true : false

  function open() {
    if (panelLoader.item) panelLoader.item.open()
  }

  function close() {
    if (panelLoader.item) panelLoader.item.close()
  }

  function togglePanel() {
    if (panelLoader.item) panelLoader.item.toggle()
  }

  function toggleWeekStart() {
    if (panelLoader.item) panelLoader.item.toggleWeekStart()
  }

  readonly property real openPanelIndicatorWidth: button.labelWidth
  readonly property real openPanelIndicatorHeight: Math.max(Style.space(10), Math.round(Style.bar.iconSlot * 0.55))

  readonly property bool popoutSwitchClosing: panelLoader.item ? panelLoader.item.popoutSwitchClosing === true : false

  function closeForPopoutSwitch() {
    if (panelLoader.item) panelLoader.item.closeForPopoutSwitch()
  }

  function injectPanel() {
    var target = panelLoader.item
    if (!target) return
    if ("bar" in target) target.bar = root.bar
    if ("settings" in target) target.settings = root.settings
    if ("anchorItem" in target) target.anchorItem = button
    if ("hostWidget" in target) target.hostWidget = root
  }

  implicitWidth: button.implicitWidth
  implicitHeight: button.implicitHeight

  onBarChanged: injectPanel()
  onSettingsChanged: injectPanel()

  SystemClock {
    id: clock
    precision: SystemClock.Minutes
    onDateChanged: root.displayDate = date
  }

  Loader {
    id: panelLoader
    active: true
    source: Qt.resolvedUrl("Panel.qml")
    visible: false
    onLoaded: {
      root.injectPanel()
      Qt.callLater(root.injectPanel)
    }
  }

  IpcHandler {
    target: "draj.bsdate"

    function refresh(): void { root.broadcast("refresh") }
    function cycleMode(): void { root.cycleMode() }
    function toggle(): void { root.togglePanel() }
    function toggleWeekStart(): void { root.toggleWeekStart() }
    function open(): void { root.open() }
    function close(): void { root.close() }
    function show(): void { root.open() }
    function hide(): void { root.close() }
  }

  WidgetButton {
    id: button
    anchors.fill: parent
    bar: root.bar
    text: "󰃭 " + root.displayText
    fontSize: Style.font.body
    horizontalMargin: 8.75
    verticalPadding: 8.75
    onPressed: function(b) {
      if (b === Qt.RightButton) root.cycleMode()
      else if (b === Qt.MiddleButton) root.openFullPatro()
      else root.togglePanel()
    }
  }
}
