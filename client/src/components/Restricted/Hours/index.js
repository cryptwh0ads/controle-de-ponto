import React, { useEffect } from 'react'
import Datasort from 'react-data-sort'
import { connect } from 'react-redux'
import { Table, Button, Grid, Form } from 'semantic-ui-react'

import { calcHr } from '../../utils/calulateHour'

import DateStr from '../../utils/DateStr'

import ActionCreators from '../../../store/actionCreators'

import moment from 'moment'

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
  const { isLoading, data } = props.hours
  const dateNow = new Date()

  useEffect(() => {
    const { page } = props.match.params
    load(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const handleChangeMonth = e => {
    props.history.push(`/restricted/hours/${e.target.value}`)
  }

  return (
    <div>
      <Grid>
        <Grid.Column width={13}>
          <h1>Horas</h1>
        </Grid.Column>
        <Grid.Column width={3}>
          <Form>
            <Form.Field inline>
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
        </Grid.Column>
      </Grid>

      {data.length > 0 ? (
        <Datasort
          data={props.hours.data}
          defaultSortBy='date'
          render={({ data, sortBy }) => (
            <div>
              <Table celled color='blue'>
                <Table.Header sortBy>
                  <Table.Row>
                    <Table.HeaderCell textAlign='center'>
                      <Button
                        circular
                        color='blue'
                        icon={
                          props.auth.user.absent === '1'
                            ? 'calendar plus outline'
                            : 'calendar minus outline'
                        }
                        onClick={async () => {
                          var worked = await calcHr(
                            moment().format('HH:mm'),
                            '',
                            '',
                            '',
                            'entrance'
                          )
                          await props.create({
                            date: moment().toJSON(),
                            entrance_1: moment().format('HH:mm'),
                            worked,
                            miss: await calcHr(
                              dateNow.getDay() === 5 ? '08:00' : '09:00',
                              worked,
                              '',
                              '',
                              'miss'
                            )
                          })
                          props.save({
                            absent: '0',
                            id: props.auth.user.id
                          })
                        }}
                        disabled={props.auth.user.absent === '1' ? false : true}
                      />
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
                          {moment(data[hr].date).format('DD/MM/YYYY') !==
                          moment().format('DD/MM/YYYY') ? (
                            data[hr].exit_1
                          ) : !data[hr].exit_1 ? (
                            <Button
                              circular
                              color='green'
                              icon='calendar check outline'
                              onClick={async () => {
                                var worked = await calcHr(
                                  data[hr].entrance_1,
                                  moment().format('HH:mm'),
                                  '',
                                  '',
                                  'b_lunch'
                                )
                                await props.update({
                                  exit_1: moment().format('HH:mm'),
                                  worked,
                                  miss: await calcHr(
                                    dateNow.getDay() === 5 ? '08:00' : '09:00',
                                    worked,
                                    '',
                                    '',
                                    'miss'
                                  ),
                                  id: data[hr].id
                                })
                              }}
                            />
                          ) : (
                            data[hr].exit_1
                          )}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {moment(data[hr].date).format('DD/MM/YYYY') !==
                          moment().format('DD/MM/YYYY') ? (
                            data[hr].entrance_2
                          ) : !data[hr].exit_1 ? null : !data[hr].entrance_2 ? (
                            <Button
                              circular
                              icon='calendar check outline'
                              color='green'
                              onClick={async () => {
                                var worked = await calcHr(
                                  data[hr].entrance_1,
                                  data[hr].exit_1,
                                  moment().format('HH:mm'),
                                  '',
                                  'a_lunch'
                                )
                                await props.update({
                                  entrance_2: moment().format('HH:mm'),
                                  worked,
                                  miss: await calcHr(
                                    dateNow.getDay() === 5 ? '08:00' : '09:00',
                                    worked,
                                    '',
                                    '',
                                    'miss'
                                  ),
                                  id: data[hr].id
                                })
                              }}
                            />
                          ) : (
                            data[hr].entrance_2
                          )}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {moment(data[hr].date).format('DD/MM/YYYY') !==
                          moment().format('DD/MM/YYYY') ? (
                            data[hr].exit_2
                          ) : !data[hr].entrance_2 ? null : !data[hr].exit_2 ? (
                            <Button
                              circular
                              icon='calendar check outline'
                              color='green'
                              onClick={async () => {
                                var worked = await calcHr(
                                  data[hr].entrance_1,
                                  data[hr].exit_1,
                                  data[hr].entrance_2,
                                  moment().format('HH:mm'),
                                  'exit'
                                )
                                await props.update({
                                  exit_2: moment().format('HH:mm'),
                                  worked,
                                  miss: await calcHr(
                                    dateNow.getDay() === 5 ? '08:00' : '09:00',
                                    worked,
                                    '',
                                    '',
                                    'miss'
                                  ),
                                  extra: await calcHr(
                                    dateNow.getDay() === 5 ? '08:00' : '09:00',
                                    worked,
                                    '',
                                    '',
                                    'extra'
                                  ),
                                  id: data[hr].id
                                })
                              }}
                            />
                          ) : (
                            data[hr].exit_2
                          )}
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </div>
          )}
        />
      ) : (
        <div>
          <Table celled color='pink'>
            <Table.Header sortBy>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>
                  <Button
                    circular
                    color='blue'
                    icon={
                      props.auth.user.absent === '1'
                        ? 'calendar plus outline'
                        : 'calendar minus outline'
                    }
                    onClick={async () => {
                      var worked = await calcHr(
                        moment().format('HH:mm'),
                        '',
                        '',
                        '',
                        'entrance'
                      )
                      await props.create({
                        date: moment().toJSON(),
                        entrance_1: moment().format('HH:mm'),
                        worked,
                        miss: await calcHr(
                          dateNow.getDay() === 5 ? '08:00' : '09:00',
                          worked,
                          '',
                          '',
                          'miss'
                        )
                      })
                      props.save({
                        absent: '0',
                        id: props.auth.user.id
                      })
                    }}
                    disabled={props.auth.user.absent === '1' ? false : true}
                  />
                  Data
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  Entrada 1
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Saida 1</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  Entrada 2
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Saida 2</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    hours: state.hours,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: page => dispatch(ActionCreators.getHoursRequest(false, '', page)),
    create: hour => dispatch(ActionCreators.createHourRequest(hour)),
    update: hour => dispatch(ActionCreators.updateHourRequest(hour)),
    save: user => dispatch(ActionCreators.updateProfileRequest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hours)
