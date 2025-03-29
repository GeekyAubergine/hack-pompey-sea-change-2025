export const SPEED_MAX = 5
export const RUDDER_ROTATION_MAX = 20

export const DRAG = 0.1

export type Vec2 = {
  readonly x: number;
  readonly y: number;
};

export function Vec2(x: number, y: number): Vec2 {
  return { x, y }
}

export type Translation = {
  readonly position: Vec2;
  readonly rotation: number;
};

export function Translation(position: Vec2, rotation: number): Translation{
  return { position, rotation}
}

export type Transform = {
  readonly translation: Translation;
  readonly velocity: Translation;
};

export function Transform(translation: Translation, velocity: Translation){
  return { translation, velocity }
}

export enum ThrottlePosition {
  Full = 1,
  ThreeQuarters = 0.75,
  Half = 0.5,
  Quarter = 0.25,
  Stop = 0,
  Reverse = -0.25,
  FullRevese = -0.5,
}

export enum RudderPosition {
  FullLeft = -1,
  HalfLeft = -0.5,
  Neutral = 0,
  HalfRight = 0.5,
  FullRight = 1,
}

export type Boat = {
  readonly id: String;
  readonly transform: Transform;
  readonly color: String;
  readonly name: String;
  readonly throttle: ThrottlePosition;
  readonly rudder: RudderPosition;
};

export function addVec2(a: Vec2, b: Vec2): Vec2{
  return Vec2(a.x + b.x, a.y + b.y)
}

export function addDrag(velocity: Translation, dt: number): Translation {
  const drag = 1 - (DRAG * dt)

  return Translation(Vec2(velocity.position.x * drag, velocity.position.y * drag), velocity.rotation * drag)
}

export function addDrivingForce(velocity: Translation, throttle: ThrottlePosition, rudder: RudderPosition, dt: number): Translation {
  return Translation(Vec2(velocity.position.x, velocity.position.y + throttle * SPEED_MAX * dt), 0)
}

export function updateTransform(transform: Transform, throttle: ThrottlePosition, rudder: RudderPosition, dt: number): Transform {
  return {
    translation: Translation(
      Vec2(
        transform.translation.position.x + transform.velocity.position.x * dt,
        transform.translation.position.y + transform.velocity.position.y * dt
      ),
      transform.translation.rotation + transform.velocity.rotation * dt,
    ),
    velocity: addDrag(addDrivingForce(transform.velocity, throttle, rudder, dt), dt)
  }
}

export function updateBoat(boat: Boat, dt: number): Boat {
  return {
    ...boat,
    transform: updateTransform(boat.transform, boat.throttle, boat.rudder, dt),
  }
}
