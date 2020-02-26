import React from 'react'
import { connect } from 'react-redux'
import { Card, CardContent, Typography, Button } from '@material-ui/core'

import { calcHr } from '../utils/calulateHour'

import { CardContainer, TitleContainer } from './styles'

import ActionCreators from '../../store/actionCreators'

import moment from 'moment'

const Home = props => {
  const { name, absent } = props.auth.user

  const dateNow = new Date()

  return (
    <div>
      <TitleContainer>
        <h1>Bem-Vindo, {name}</h1>
      </TitleContainer>
      {absent === '1' ? (
        <CardContainer>
          <Card elevation={5}>
            <CardContent>
              <Typography gutterBottom>
                Parece que você ainda não marcou a entrada!
              </Typography>
              <Typography gutterBottom color='textSecondary'>
                É só clicar no botão abaixo
              </Typography>
              <Button
                style={{
                  color: '#FFF',
                  backgroundColor: '#5aa4cf',
                  marginTop: '3rem',
                  width: 120,
                  marginLeft: '30%'
                }}
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
              >
                Check-in
              </Button>
            </CardContent>
          </Card>
        </CardContainer>
      ) : null}
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
    create: hour => dispatch(ActionCreators.createHourRequest(hour)),
    save: user => dispatch(ActionCreators.updateProfileRequest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
