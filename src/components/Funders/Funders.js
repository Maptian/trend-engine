import React, { Component } from 'react'
import './Funders.css'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import _ from 'underscore'
import mapboxgl from 'mapbox-gl'
import funders from '../../data/funders.json'
import themes from '../../data/themes.json'
window.jQuery = window.$ = $

export default (class Funders extends Component {
  constructor(props) {
    super(props)
    var fundersA = []
    var fundersB = []
    var n = 1
    _.each(funders, function(funder, id) {
      if (n < 41) {
        fundersA.push(funder)
      }
      if (n > 40 && n < 90) {
        fundersB.push(funder)
      }
      n++
    })
    var args = props.location.pathname.split('/')
    this.state = {
      org: args[2],
      fundersA: fundersA,
      fundersB: fundersB,
      showTrends: false,
      showFunders: false,
      year: 2017
    }
  }

  componentDidMount() {
    var _self = this
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG1jY2FyZXkiLCJhIjoiRl9FV3ZXNCJ9.l1rdsm-F9Vwzcimtf1qMHg';
    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/dmccarey/cjk8sja2n1q7v2so18lcniue0', // stylesheet location
        center: [-1.479,52.807], // starting position [lng, lat]
        pitch: 40,
        zoom: 6 // starting zoom
    })
    var map = this.map
    map.addControl(new mapboxgl.NavigationControl())

    map.on('load', function () {

    map.addLayer({
        'id': 'grants-1',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.ado0y94v'
        },
        'source-layer': 'grant-points-1-9deb3i',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 6, value: 0}, 2],
                [{zoom: 6, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });

    map.addLayer({
        'id': 'grants-2',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.799hzec5'
        },
        'source-layer': 'grant-points-2-8l5wsm',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });


    map.addLayer({
        'id': 'grants-3',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.1s5rr3wi'
        },
        'source-layer': 'grant-points-3-4we2nz',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });


    map.addLayer({
        'id': 'grants-4',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.1pcq9i82'
        },
        'source-layer': 'grant-points-4-5m38iu',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });


    map.addLayer({
        'id': 'grants-5',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.3mivavc6'
        },
        'source-layer': 'grant-points-5-btn8i2',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });


    map.addLayer({
        'id': 'grants-6',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.djglp0oo'
        },
        'source-layer': 'grant-points-6-3pgjbl',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });


    map.addLayer({
        'id': 'grants-7',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.6li3ogoi'
        },
        'source-layer': 'grant-points-7-bpoow7',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });



    map.addLayer({
        'id': 'grants-8',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.02h7o9wl'
        },
        'source-layer': 'grant-points-8-2vxlq1',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });


    map.addLayer({
        'id': 'grants-9',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.64rwjuj1'
        },
        'source-layer': 'grant-points-9-4k86o4',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });


    map.addLayer({
        'id': 'grants-10',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.8z5esh0e'
        },
        'source-layer': 'grant-points-10-6gqotu',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });


    map.addLayer({
        'id': 'grants-11',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.awnpe1w8'
        },
        'source-layer': 'grant-points-11-0tz8is',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });


    map.addLayer({
        'id': 'grants-12',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.arlxzl80'
        },
        'source-layer': 'grant-points-12-dwj9zp',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });

    map.addLayer({
        'id': 'grants-13',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.0fbwpld1'
        },
        'source-layer': 'grant-points-13-bkd8ck',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });



    map.addLayer({
        'id': 'grants-14',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.dhs4vn13'
        },
        'source-layer': 'grant-points-14-bpvlq9',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    });


    map.addLayer({
        'id': 'grants-15',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.cxx8it1d'
        },
        'source-layer': 'grant-points-15-1o9san',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'property': 'amountAwarded',
              'type': 'exponential',
              'stops': [
                [{zoom: 4, value: 0}, 1],
                [{zoom: 4, value: 400000}, 3],
                [{zoom: 5, value: 0}, 2],
                [{zoom: 5, value: 400000}, 5],
                [{zoom: 8, value: 0}, 2],
                [{zoom: 8, value: 400000}, 30],
                [{zoom: 10, value: 0}, 2],
                [{zoom: 10, value: 400000}, 40]
              ]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': '#E8873C',
            'circle-opacity': 0,
            'circle-stroke-color': '#E8873C',
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 0.5,
            'circle-pitch-alignment': 'map'
        }
    })

    _self.filterMap(_self.state.org, _self.state.year)

   })

  }


  componentWillReceiveProps(newProps) {
    var args = newProps.location.pathname.split('/')
    var org = args[2]
    this.filterMap(org, this.state.year)
  }


  filterMap(org, year) {
    this.setState({
      org: org
    })
    var dates = [
     '2004',
     '2005',
     '2006',
     '2007',
     '2008',
     '2009',
     '2010',
     '2011',
     '2012',
     '2013',
     '2014',
     '2015',
     '2016',
     '2017',
     '2018'
   ]

   var n = 0
   var filters = ["all",
     ["==", 'awardYear', year.toString()]
   ]
   if (org !== 'All Funders') {
      filters.push(["==", 'fundingOrganization', org])
   }
   this.map.setFilter('grants-1', filters)
   this.map.setFilter('grants-2', filters)
   this.map.setFilter('grants-3', filters)
   this.map.setFilter('grants-4', filters)
   this.map.setFilter('grants-5', filters)
   this.map.setFilter('grants-6', filters)
   this.map.setFilter('grants-7', filters)
   this.map.setFilter('grants-8', filters)
   this.map.setFilter('grants-9', filters)
   this.map.setFilter('grants-10', filters)
   this.map.setFilter('grants-11', filters)
   this.map.setFilter('grants-12', filters)
   this.map.setFilter('grants-13', filters)
   this.map.setFilter('grants-14', filters)
   this.map.setFilter('grants-15', filters)
  }


  toggleTrends(e) {
    e.preventDefault()
    if (this.state.showTrends === false) {
      this.setState({
        showTrends: true,
        showFunders: false
      })
    } else {
      this.setState({
        showTrends: false,
        showFunders: false
      })
    }
  }

  toggleFunders(e) {
    e.preventDefault()
    if (this.state.showFunders === false) {
      this.setState({
        showFunders: true,
        showTrends: false
      })
    } else {
      this.setState({
        showFunders: false,
        showTrends: false
      })
    }
  }


  changeYear(e) {
   //console.log(e.target.value)
   this.setState({
     year: e.target.value
   })
   this.filterMap(this.state.org, this.state.year)
  }


  render() {
    return(
      <div>
       { this.state.showFunders === true &&
        <div className="funders-menu">
        <div className="container">
          <div className="row">
          <div className="col-xs-6">
         <ul>
           <li><Link to={ "/funder/All%20Funders" }>All Funders</Link></li>
          { this.state.fundersA.map((item, i) =>
              <li><Link key={i} to={ "/funder/" + item.name }>{ item.name }</Link></li>
          )}
         </ul>
         </div>
         <div className="col-xs-6">
        <ul>
         { this.state.fundersB.map((item, i) =>
             <li><Link key={i} to={ "/funder/" + item.name }>{ item.name }</Link></li>
         )}
        </ul>
        </div>
        </div>
        </div>
        </div>
       }
       { this.state.showTrends === true &&
        <div className="trends-menu">
          <div className="container">
            <div className="row">
            <div className="col-xs-3">
            <ul>
            <li><Link to="/trend/addiction/amount">Addiction</Link></li>
            <li><Link to="/trend/arts/amount">Arts</Link></li>
            <li><Link to="/trend/communities/amount">Communities</Link></li>
            <li><Link to="/trend/disabilities/amount">Disabilities</Link></li>
            <li><Link to="/trend/domestic abuse/amount">Domestic Abuse</Link></li>
            <li><Link to="/trend/education/amount">Education</Link></li>
            <li><Link to="/trend/employment/amount">Employment</Link></li>
            </ul>
            </div>
            <div className="col-xs-3">
            <ul>
            <li><Link to="/trend/environment/amount">Environment</Link></li>
            <li><Link to="/trend/family/amount">Family</Link></li>
            <li><Link to="/trend/health/amount">Health</Link></li>
            <li><Link to="/trend/housing/amount">Housing</Link></li>
            <li><Link to="/trend/immigration/amount">Immigration</Link></li>
            <li><Link to="/trend/LGBTQ/amount">LGBTQ</Link></li>
            <li><Link to="/trend/mental health/amount">Mental Health</Link></li>
            </ul>
            </div>
            <div className="col-xs-3">
            <ul>
            <li><Link to="/trend/minorities/amount">Minorities</Link></li>
            <li><Link to="/trend/poverty/amount">Poverty</Link></li>
            <li><Link to="/trend/recreation/amount">Recreation</Link></li>
            <li><Link to="/trend/recycling/amount">Recycling</Link></li>
            <li><Link to="/trend/rural life/amount">Rural life</Link></li>
            <li><Link to="/trend/social services/amount">Social Services</Link></li>
            </ul>
            </div>
            <div className="col-xs-3">
            <ul>
            <li><Link to="/trend/sport/amount">Sport</Link></li>
            <li><Link to="/trend/sexual abuse/amount">Sexual Abuse</Link></li>
            <li><Link to="/trend/technology/amount">Technology</Link></li>
            <li><Link to="/trend/therapy/amount">Therapy</Link></li>
            <li><Link to="/trend/volunteering/amount">Volunteering</Link></li>
            <li><Link to="/trend/youth/amount">Youth</Link></li>
            </ul>
            </div>
            </div>
          </div>
        </div>
        }
        <div className="header">
          <div className="container">
           <div className="row">
            <div className="col-sm-12">
            <Link className="brand" to="/"><span>360</span>Giving<br/><em>Trend Engine</em></Link>
            <a className="trends-menu-item menu-item" onClick={this.toggleTrends.bind(this)} >Trends</a>
            <a className="funders-menu-item menu-item" onClick={this.toggleFunders.bind(this)} >Funders</a>
            </div>
              </div>
            </div>
          </div>
          <input name="range" id="range" onChange={this.changeYear.bind(this)} type="range" min="1994" max="2017" value={this.state.year} step="1" />
          <div id="funder">{ this.state.org }</div>
          <div id="date">{ this.state.year }</div>
          <div id="map"></div>
      </div>
    )
  }
})
