import { describe, expect, test} from "bun:test"
import { addDrag, ThrottlePosition, Transform, Translation, updateBoat, updateTransform, Vec2, type Boat } from "./physics"

describe("#updateTransform", () => {
  test('it should not move anything if dt is 0', () => {
    const input = Transform(Translation(Vec2(0, 0), 0), Translation(Vec2(0, 0), 0))
    const out = Transform(Translation(Vec2(0, 0), 0), Translation(Vec2(0, 0), 0))

    expect(updateTransform(input, 0, 0, 0).translation).toEqual(out.translation)
  })

  test('it should not move if velocity is 0', () => {
    const input = Transform(Translation(Vec2(0, 0), 0), Translation(Vec2(0, 0), 0))
    const out = Transform(Translation(Vec2(0, 0), 0), Translation(Vec2(0, 0), 0))

    expect(updateTransform(input, 0, 0, 1).translation).toEqual(out.translation)
  })

  test('it should move boat', () => {
    const input = Transform(Translation(Vec2(0, 0), 0), Translation(Vec2(1, 0.5),3))
    const out = Transform(Translation(Vec2(2, 1), 6), Translation(Vec2(1, 0.5), 3))

    expect(updateTransform(input, 0, 0, 2).translation).toEqual(out.translation)
  })
})

describe('#addDrag', () => {
  test('it should add drag', () => {
    const input = Translation(Vec2(1, 0), 0)
    const out = Translation(Vec2(0.95, 0), 0)

    expect(addDrag(input, 0.5)).toEqual(out)
  })
})
