import play.api.{Application, GlobalSettings}
import play.api.libs.concurrent.Akka
import play.api.Play.current
import scala.concurrent.duration._
import sim.Simulator

object Global extends GlobalSettings {
  
  override def onStart (app: Application) = {
    sim.Simulator.start(Akka.system)
  }
  
}
