export default class RouteConfig {
    constructor(
      path = "", 
      component = null, 
      protectedRoute = false, 
      routes = [], 
      exact = false
    ) {
      this.path = path;
      this.component = component;
      this.protected = protectedRoute;
      this.routes = routes;
      this.exact = exact;
    }
  }
  