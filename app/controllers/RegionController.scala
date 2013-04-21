package controllers

import play.api._
import play.api.mvc._

object RegionController extends Controller {

  def index = Action {
    Ok(views.html.regions("Placeholder for a list of region objects."))
  }

}