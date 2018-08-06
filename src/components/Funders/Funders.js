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
        minZoom: 7,
        zoom: 7 // starting zoom
    })
    var map = this.map
    map.addControl(new mapboxgl.NavigationControl())

    map.on('load', function () {

    map.addLayer({
        'id': 'grants-1',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://dmccarey.2jssqyoc'
        },
        'source-layer': 'grants-1-1w8sxp',
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
            url: 'mapbox://dmccarey.5ko3i90l'
        },
        'source-layer': 'grants-2-1w7wjg',
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


    /*_self.popup = new mapboxgl.Popup()
    map.on('mouseover', 'grants-1', function (e) {
      _self.showPopup(e)
    })
    map.on('mouseover', 'grants-2', function (e) {
      _self.showPopup(e)
    })
    */

    _self.filterMap(_self.state.org, _self.state.year)

   })

  }


  showPopup(e) {
    var _self = this
    console.log(e.features)
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = 'test'
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    _self.popup
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(_self.map);
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
              <li key={i}><Link to={ "/funder/" + item.name }>{ item.name }</Link></li>
          )}
         </ul>
         </div>
         <div className="col-xs-6">
        <ul>
         { this.state.fundersB.map((item, i) =>
             <li key={i}><Link to={ "/funder/" + item.name }>{ item.name }</Link></li>
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
