package sim

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import play.api.libs.concurrent.Execution.Implicits._
import scala.collection.mutable.ListBuffer
import scala.concurrent.duration._
import play.api.libs.json._
import models._
import formats._

class Simulation extends Actor {
  import Simulation._
  import Event._
  
  val events = new ListBuffer[Event[_]]()
  val aircrafts = new ListBuffer()
  
  val randomGen = new java.util.Random
  
  def receive = {
    case Tick => println("tick")
    case GetEvents(lastEventId) => sender ! events.toList.takeWhile(_.eventId != lastEventId).toList
    case AddAircraft(aircraft) => {
      println("Added aircraft")
      
      // add aircraft
      logEvent(AircraftAddedEvent(math.abs(randomGen.nextLong), aircraft))
    }
  }
  
  def logEvent (ev: Event[_]) =  {
    //if (events.size > 100) events drop 1 
    events append ev
  }
}

object Simulation {
  class Command
  case object Tick extends Command // is a 'tick' actually needed? maybe it can all be scheduled using time
  case class GetEvents (lastEventId: Long) extends Command
  case class AddAircraft(aircraft: Aircraft)
}

sealed abstract class Event [T:Format](val eventType: String) {self: T =>
  def eventId: Long
  def toJson = Json.obj("eventType"->eventType) ++ Json.toJson(this).asInstanceOf[JsObject]
}

object Event {
  case class AircraftAddedEvent(eventId: Long, target: Aircraft)           extends Event[AircraftAddedEvent]("aircraft_added")
  case class AircraftVelocityChangedEvent(eventId: Long, target: Aircraft) extends Event[AircraftVelocityChangedEvent]("aircraft_velocity_changed")
}

object Simulator {
  // TODO: make this safer
  var simulation: ActorRef = _
  
  def start (system: ActorSystem) {
    simulation = system.actorOf(Props(new sim.Simulation))
    system.scheduler.schedule(0 seconds, 1 second) {
      simulation ! Simulation.Tick
    }
    
    // add a couple of aircraft
    system.scheduler.scheduleOnce(5 seconds) {
      simulation ! Simulation.AddAircraft(Aircraft("a", 2, LatLong(40.753716F, -73.988285F), Velocity(100, 100)))
      simulation ! Simulation.AddAircraft(Aircraft("b", 3, LatLong(40.778938F, -73.967857F), Velocity(0, 50)))
    }
  }
}
