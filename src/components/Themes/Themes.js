import React, { Component } from 'react'
import './Themes.css'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import Highcharts from 'highcharts'
import _ from 'underscore'
import funders from '../../data/funders.json'
import themes from '../../data/themes.json'
window.jQuery = window.$ = $

export default (class Themes extends Component {
  constructor(props) {
    super(props)
    var args = props.location.pathname.split('/')
    var theme = args[2]
    var field = args[3]
    var themeData = themes[theme]
    var rows = []
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

    _.each(themeData, function(row, name) {
      rows.push({
        row: row,
        count: row.count,
        amount: row.amount,
        name: name
      })
    })
    rows = _.sortBy(rows, field).reverse()

    this.state = {
      subject: theme,
      data: rows,
      field: field,
      fundersA: fundersA,
      fundersB: fundersB,
      showTrends: false,
      showFunders: false
    }
  }

  componentDidMount() {
    this.queryData()
  }

  componentWillReceiveProps(newProps) {
    var _self = this
    var args = newProps.location.pathname.split('/')
    var theme = args[2]
    var field = args[3]
    var themeData = themes[theme]
    var rows = []
    this.setState({
      rows: []
    })
    _.each(themeData, function(row, name) {
      rows.push({
        row: row,
        count: row.count,
        amount: row.amount,
        name: name
      })
    })
    rows = _.sortBy(rows, field).reverse()
    this.setState({
      subject: theme,
      data: rows,
      field: field
    })
    setTimeout(function() {
        _self.queryData()
    }, 1000)

  }

  queryData() {
    var _self = this
    var theme = this.state.subject
    var themeData = themes[theme]
    _.each(themeData, function(org, title) {
        var data = []
        var container = 'chart-' + title
      _.each(org.timeline, function(values, year) {
        data.push(values[_self.state.field])
      })
      _self.drawChart(container, data, title)
    })


  }

  drawChart(container, data, title) {
    Highcharts.chart(container, {
    chart: {
        type: 'area',
        backgroundColor: 'transparent'
    },
    title: '',
    xAxis: {
        allowDecimals: false,
        gridLineWidth: 0,
        labels: {
            style: {
              color: '#aaa'
            },
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        }
    },
    yAxis: {
        gridLineWidth: 0,
        title: {
            text: ''
        },
        labels: {
            enabled: false,
            style: {
              color: '#aaa'
            },
            formatter: function () {
                return this.value
            }
        }
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
        area: {
            pointStart: 1990,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: title,
        color: '#E8873C',
        data: data
    }]
  })
  }


  setYear(id, e) {
    e.preventDefault()
    console.log(id)
    this.queryData(id)
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

  roundTotal(val) {
    if (val > 1000000000) {
      return (val / 1000000000).toFixed(1) + 'B'
    }
    if (val > 1000000) {
     return (val / 1000000).toFixed() + 'M'
    }
    if (val > 10000) {
      return (val / 1000).toFixed() + 'K'
    }
    if (val > 1000) {
      return (val / 1000).toFixed(1) + 'K'
    }
    if (val > 0) {
      return val
    }
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

      <div className="container">
      <h1>{ this.state.subject }</h1>
        <ul className="view-options">
         <li><Link to={ '/trend/' + this.state.subject + '/amount' }>Amount Awarded</Link></li>
         <li><Link to={ '/trend/' + this.state.subject + '/count' }>Projects funded</Link></li>
        </ul>
       { this.state.data.map((item, i) =>
        <div key={i} className="row result">
         <h2>{i + 1} { item.row.name }</h2>
        <div className="col-xs-7 col-sm-9 col-md-10">
          <div id={ 'chart-' + item.name } className="chart"></div>
        </div>
        <div className="col-xs-5 col-sm-3 col-md-2">
          <span className="total">{ this.roundTotal(item.row[this.state.field]) }</span>
        </div>
        </div>
      )}
      </div>
      </div>
    )
  }
})
