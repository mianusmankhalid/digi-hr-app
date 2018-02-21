export default class Route {
  name = null;
  component = null;
  trackingName = null;

  constructor(name, component, trackingName = "") {
    this.name = name;
    this.component = component;
    this.trackingName = trackingName;
  }

  get Name() {
    return this.name;
  }

  get Component() {
    return this.component;
  }

  get TrackingName() {
    return this.trackingName;
  }
}
