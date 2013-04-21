package models

import play.api._, mvc._


case class LatLong(latitude: Float, longitude: Float)

class Region(val name: String = "anonymous", val northWestCorner: LatLong, val southEastCorner: LatLong, weatherConditions: MetConditions)

