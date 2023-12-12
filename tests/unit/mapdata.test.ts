import { selectMaxAreaFeatureIdx, selectMinAreaFeatureIdx } from '@/hooks/useFeatureStyling'
import { convertDataToGeoJSON } from '@/hooks/useMapFeatures'
import { geoJsonFromCoords } from '../utils'

describe('Test map data transformation', () => {
  it('convert data to geojson', () => {
    const data = {
      Coords: {
        "region1": [
          { latitude: 1, longitude: 2 },
          { latitude: 3, longitude: 4 },
        ],
        "region2": [
          { latitude: 5, longitude: 6 },
          { latitude: 7, longitude: 8 },
        ],
      }
    }

    const output = geoJsonFromCoords([
      [
        [2, 1],
        [4, 3],
      ],
      [
        [6, 5],
        [8, 7],
      ],
    ])

    expect(convertDataToGeoJSON(data)).toEqual(output)
  })

  it('Test map data transform with empty Coords object', () => {
    const data = {
      Coords: {}
    }

    const geoJSON = {
      type: "FeatureCollection",
      features: []
    }

    expect(convertDataToGeoJSON(data)).toEqual(geoJSON)
  })

  it('Test min and max area feature selection', () => {
    const geoJSON = geoJsonFromCoords([
      [
        [0, 0],
        [0, 2],
        [2, 2],
        [2, 0],
      ],
      [
        [0, 0],
        [0, 3],
        [3, 3],
        [3, 0]
      ],
      [
        [0, 0],
        [0, 4],
        [4, 4],
        [4, 0]
      ]
    ])

    const minIdx = selectMinAreaFeatureIdx(geoJSON)
    expect(minIdx).toEqual(0)

    const maxIdx = selectMaxAreaFeatureIdx(geoJSON)
    expect(maxIdx).toEqual(2)
  })
})
