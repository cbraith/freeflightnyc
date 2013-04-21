package models

import play.api.libs.json.Json
import sim.Event._

/*
// TODO: stub, replace with real one
case class Aircraft(name: String, test: Int, currentPosition: LatLong, velocity: Velocity)

case class Velocity(direction: Int, speed: Int)
*/

/**
 * Serialization formats for json
 */
object formats {
  implicit val latLongF = Json.format[LatLong]
  //implicit val velocityF = Json.format[Velocity]
  implicit val aircraftF = Json.format[Aircraft]
  
  // events
  implicit val aircraftAddedF = Json.format[AircraftAddedEvent]
  implicit val aircraftVelocityChangedF = Json.format[AircraftVelocityChangedEvent]
}
