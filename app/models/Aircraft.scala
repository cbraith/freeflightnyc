package models




import akka.actor.{ Actor, ActorRef, ActorSystem, Props, FSM }
import akka.event.Logging
import scala.concurrent.duration._


sealed trait AircraftState

object AircraftState{
      case object Parked extends AircraftState
      case object Lit extends AircraftState
      case object Taxiing extends AircraftState
      case object Takeoff extends AircraftState
      case object TakeoffCommit extends AircraftState
      case object InFlight extends AircraftState
}


abstract class AircraftBehavior{
      def trigger(target: Aircraft)
}



//class Aircraft(val transponderID, _altitude: Int) extends Actor with FSM[AircraftState, Data] {
class Aircraft(val transponderID: String, var _altitude: Int) extends Actor with akka.actor.ActorLogging{
      def altitude: Int = { _altitude }

      def provision() = {}
      def load() = {}
      def unload = {}
      

      //def apply(transponderID: String, )

      def receive = {
      	  // TODO: figure out some kind of polymorphic dispatch
      	  case AircraftState.Lit => {
	       log.info(s"Aircraft $transponderID is lit up.")	       
	  }  

	  case AircraftState.Taxiing => {
	       log.info(s"Aircraft $transponderID is taxiing.")
	  } 
      }

      def climb(newAltitude: Int) = {
      	  // TODO: do this on a gradient
	  _altitude = newAltitude;
      }

      def descend(newAltitude: Int) = {
      	  _altitude = newAltitude;
      }

      def addBehavior(state: AircraftState) = {
      	  // TODO: figure out a Behavior class
      }
}
