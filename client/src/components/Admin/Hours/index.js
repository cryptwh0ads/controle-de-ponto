import React, { useEffect, createRef as useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Label, Segment, Form, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Datasort from 'react-data-sort'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { toSeconds } from '../../utils/toSeconds'

import ActionCreators from '../../../store/actionCreators'
import DateStr from '../../utils/DateStr'

const MonthOptions = [
  { key: '1', value: '1', text: 'Janeiro' },
  { key: '2', value: '2', text: 'Fevereiro' },
  { key: '3', value: '3', text: 'Março' },
  { key: '4', value: '4', text: 'Abril' },
  { key: '5', value: '5', text: 'Maio' },
  { key: '6', value: '6', text: 'Junho' },
  { key: '7', value: '7', text: 'Julho' },
  { key: '8', value: '8', text: 'Agosto' },
  { key: '9', value: '9', text: 'Setembro' },
  { key: '10', value: '10', text: 'Outubro' },
  { key: '11', value: '11', text: 'Novembro' },
  { key: '12', value: '12', text: 'Dezembro' }
]

const Hours = props => {
  const { load } = props
  const { isLoading } = props.hours
  const [toggle, setToggle] = useState(false)
  const [next, setNext] = useState(false)
  const [previous, setPrevious] = useState(false)
  const [current, setCurrent] = useState(1)
  const [last, setLast] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [missHour, setMissHour] = useState('00:00')
  const [workedHour, setWorked] = useState('00:00')
  const [extraHour, setExtra] = useState('00:00')

  let refEmployee = useRef(null)
  let count = 0

  const missArr = []
  const workedArr = []
  const extraArr = []

  const getMissHour = () => {
    Object.keys(props.hours.data).map(hour => {
      return missArr.push([toSeconds(props.hours.data[hour].miss)])
    })
  }

  const getWorkedHour = () => {
    Object.keys(props.hours.data).map(hour => {
      return workedArr.push([toSeconds(props.hours.data[hour].worked)])
    })
  }

  const getExtraHour = () => {
    Object.keys(props.hours.data).map(hour => {
      return extraArr.push([toSeconds(props.hours.data[hour].extra)])
    })
  }

  const sumMissHour = () => {
    getMissHour()

    var difference = missArr.reduce(
      (r, a) => a.map((b, i) => (r[i] || 0) + b),
      []
    )
    var result = [
      Math.floor(difference / 3600), // an hour has 3600 seconds
      Math.floor((difference % 3600) / 60), // a minute has 60 seconds
      difference % 60
    ]
    // 0 padding and concatation
    result = result
      .map(function(v) {
        return v < 10 ? '0' + v : v
      })
      .join(':')

    setMissHour(result)
  }

  const sumWorkedHour = () => {
    getWorkedHour()

    var difference = workedArr.reduce(
      (r, a) => a.map((b, i) => (r[i] || 0) + b),
      []
    )
    var result = [
      Math.floor(difference / 3600), // an hour has 3600 seconds
      Math.floor((difference % 3600) / 60), // a minute has 60 seconds
      difference % 60
    ]
    // 0 padding and concatenation
    result = result
      .map(function(v) {
        return v < 10 ? '0' + v : v
      })
      .join(':')

    setWorked(result)
  }

  const sumExtraHour = () => {
    getExtraHour()

    var difference = extraArr.reduce(
      (r, a) => a.map((b, i) => (r[i] || 0) + b),
      []
    )
    var result = [
      Math.floor(difference / 3600), // an hour has 3600 seconds
      Math.floor((difference % 3600) / 60), // a minute has 60 seconds
      difference % 60
    ]
    // 0 padding and concatation
    result = result
      .map(function(v) {
        return v < 10 ? '0' + v : v
      })
      .join(':')

    setExtra(result)
  }

  const markDayOff = async ({ user_id }) => {
    const diffTime = Math.abs(endDate - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    while (count <= diffDays) {
      await props.create({
        date: startDate.toJSON(),
        entrance_1: 'FOLGA',
        exit_1: 'FOLGA',
        entrance_2: 'FOLGA',
        exit_2: 'FOLGA',
        id_user: user_id
      })
      startDate.setDate(startDate.getDate() + 1)
      count += 1
    }
    load(current)
  }
  function sortList() {
    var list, i, switching, b, shouldSwitch
    list = document.getElementById('selectemployee')
    switching = true
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false
      b = list.getElementsByTagName('option')
      // Loop through all list-items:
      for (i = 0; i < b.length - 1; i++) {
        // start by saying there should be no switching:
        shouldSwitch = false
        /* check if the next item should
        switch place with the current item: */
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true
          break
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i])
        switching = true
      }
    }
  }
  const handleChangeMonth = e => {
    props.history.push(`/admin/hours/${e.target.value}`)
  }

  //When I wrote this, only God and I understood what I was doing
  //Now, God only knows
  useEffect(() => {
    const { page } = props.match.params
    sumMissHour()
    sumWorkedHour()
    sumExtraHour()
    if (toggle) {
      setLast(current)
      setCurrent(
        refEmployee.current.value ? refEmployee.current.value : current
      )
      load(
        refEmployee.current.value ? refEmployee.current.value : current,
        page
      )
      setToggle(false)
      setPrevious(false)
      setNext(false)
    } else if (previous) {
      setLast(current)
      setCurrent(last)
      load(current, page)
      setToggle(false)
      setPrevious(false)
    } else if (next) {
      if (current < props.hours.users.length) {
        setLast(current)
        setCurrent(parseInt(current) + 1)
        load(current, page)
        setToggle(false)
        setNext(false)
      }
      setToggle(false)
      setNext(false)
    } else if (props.history.location.state !== undefined) {
      load(props.history.location.state.prevUser, page)
      setCurrent(props.history.location.state.prevUser)
      props.history.location.state = undefined
      setToggle(false)
    } else {
      load(current, page)
    }
    setToggle(false)
    setPrevious(false)
    setNext(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])
  return (
    <div>
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={3} textAlign='center'>
            <Label as='a' size='large'>
              {props.hours.currentUser &&
                Object.keys(props.hours.currentUser).map(user => {
                  return props.hours.currentUser[user].name
                })}
            </Label>
            <Form>
              <Form.Field>
                <label>Selecione o prestador</label>
                <select
                  ref={refEmployee}
                  onChange={() => setToggle(true)}
                  className='custom-select'
                  id='selectemployee'
                  onMouseOver={sortList}
                >
                  {props.hours.users &&
                    Object.keys(props.hours.users).map(user => {
                      return (
                        <option
                          value={props.hours.users[user].id}
                          key={user}
                          selected={
                            props.hours.currentUser[0] !== undefined
                              ? props.hours.users[user].id ===
                                props.hours.currentUser[0].id
                                ? true
                                : false
                              : false
                          }
                        >
                          {props.hours.users[user].name}
                        </option>
                      )
                    })}
                </select>
              </Form.Field>
            </Form>
            <div></div>
            <Button.Group attached='bottom'>
              <Button
                negative
                onClick={() => {
                  setPrevious(true)
                  setNext(false)
                }}
              >
                Anterior
              </Button>
              <Button.Or text='' />
              <Button
                positive
                onClick={() => {
                  setNext(true)
                  setPrevious(false)
                }}
              >
                Próximo
              </Button>
            </Button.Group>
            <div>
              <Form>
                <Form.Field>
                  <label>Selecione o Mês</label>
                  <select
                    onChange={handleChangeMonth}
                    defaultValue={props.match.params.page}
                  >
                    {MonthOptions.map(m => {
                      return (
                        <option key={m.key} value={m.value}>
                          {m.text}
                        </option>
                      )
                    })}
                  </select>
                </Form.Field>
              </Form>
            </div>
            <h4>
              <Label>Marcar folga</Label>
            </h4>
            {props.hours.currentUser &&
              Object.keys(props.hours.currentUser).map(user => {
                return (
                  <Form key={user}>
                    <Form.Field>
                      <Label>De</Label>
                      <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat='dd/MM/yyyy'
                      />
                    </Form.Field>
                    <div></div>
                    <Form.Field>
                      <Label>Ate</Label>
                      <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat='dd/MM/yyyy'
                      />
                    </Form.Field>
                    <div></div>
                    <Button
                      onClick={() =>
                        markDayOff({
                          user_id: props.hours.currentUser[user].id
                        })
                      }
                      color='green'
                      type='button'
                    >
                      Salvar
                    </Button>
                  </Form>
                )
              })}
          </Grid.Column>
          <Grid.Column width={10}>
            {props.hours.data.length === 0 && (
              <Segment color='yellow'>
                Não há registro de horas deste usuário.
              </Segment>
            )}
            {props.hours.data.length > 0 && (
              <>
                <Datasort
                  data={props.hours.data}
                  defaultSortBy='date'
                  render={({ data, sortby }) => (
                    <Table celled color='pink'>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell textAlign='center'>
                            Data
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>
                            Entrada 1
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>
                            Saida 1
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>
                            Entrada 2
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>
                            Saida 2
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>
                            Ações
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {Object.keys(data).map(hr => {
                          return (
                            <Table.Row key={hr}>
                              <Table.Cell textAlign='center'>
                                <DateStr
                                  date={data[hr].date}
                                  timezone='America/Sao_Paulo'
                                />
                              </Table.Cell>
                              <Table.Cell textAlign='center'>
                                {data[hr].entrance_1}
                              </Table.Cell>
                              <Table.Cell textAlign='center'>
                                {data[hr].exit_1}
                              </Table.Cell>
                              <Table.Cell textAlign='center'>
                                {data[hr].entrance_2}
                              </Table.Cell>
                              <Table.Cell textAlign='center'>
                                {data[hr].exit_2}
                              </Table.Cell>
                              <Table.Cell textAlign='center'>
                                <Button.Group>
                                  <Button
                                    positive
                                    as={Link}
                                    to={`/admin/hours/${data[hr].id}/edit`}
                                    onClick={() => setToggle(false)}
                                  >
                                    Editar
                                  </Button>
                                  <Button.Or text='<>' />
                                  <Button
                                    negative
                                    onClick={() => props.remove(data[hr].id)}
                                  >
                                    Remover
                                  </Button>
                                </Button.Group>
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                  )}
                />
              </>
            )}
          </Grid.Column>
          <Grid.Column width={3} textAlign='center'>
            <Table definition>
              <Table.Header></Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Saldo Anterior</Table.Cell>
                  <Table.Cell>00:00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Horas Devidas</Table.Cell>
                  <Table.Cell>{missHour}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Horas Extras</Table.Cell>
                  <Table.Cell>{extraHour}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Horas Trabalhadas</Table.Cell>
                  <Table.Cell>{workedHour}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <div></div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    hours: state.hours
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (userID, page) =>
      dispatch(ActionCreators.getHoursRequest(true, userID, page)),
    remove: id => dispatch(ActionCreators.removeHourRequest(id)),
    create: hour => dispatch(ActionCreators.createHourRequest(hour)),
    save: hour => dispatch(ActionCreators.updateHourRequest(hour))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hours)
