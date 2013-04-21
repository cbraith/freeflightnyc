package models

import play.api._
import play.api.mvc._



sealed abstract class CardinalDirection(val degrees: Int)


object CardinalDirection{
       case object N extends CardinalDirection(0)
       case object E extends CardinalDirection(90)
       case object W extends CardinalDirection(270)
       case object S extends CardinalDirection(180)
       case object NE extends CardinalDirection(45)
       case object SE extends CardinalDirection(135)
       case object SW extends CardinalDirection(225)
       case object NW extends CardinalDirection(315)
}


class Temperature(val celsius: Int){
      //def fahrenheit: Int: { ((celsius - 32)*5)/9  } 
}


sealed trait PrecipitationType


object PrecipitationType{
       case object NONE extends PrecipitationType
       case object SNOW extends PrecipitationType
       case object RAIN extends PrecipitationType
       case object HAIL extends PrecipitationType
       case object SLEET extends PrecipitationType
}


class Wind(val speed: Int, val direction: CardinalDirection)



class Distance(val miles: Int){

      //def kilometers
}


class Visibility(val miles: Distance)



class MetConditions(val precipitation: PrecipitationType=PrecipitationType.NONE, 
      		    val wind: Wind,
		    val temperature: Temperature,
		    val visibility: Visibility){
      
}
