import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Button,
  Segment,
  Icon,
  Confirm,
  Modal,
  Header
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import ActionCreators from '../../../store/actionCreators'
import Datasort from 'react-data-sort'

import RegisterUser from './RegisterUser'

const Users = props => {
  const { load } = props
  const [stateOpen, setStateOpen] = useState(false)
  const [idUser, setIdUser] = useState(null)

  const handleConfirm = id => {
    props.remove(id)
    setStateOpen(false)
  }

  const handleClick = id => {
    setStateOpen(true)
    setIdUser(id)
  }

  useEffect(() => {
    load()
  }, [load])
  return (
    <div>
      {props.users.isLoading && (
        <p>
          <Icon size='large' loading name='circle notch' />
        </p>
      )}
      {!props.users.isLoading && props.users.data.length === 0 && (
        <Segment color='blue'>No registered users</Segment>
      )}
      {!props.users.isLoading && props.users.data.length > 0 && (
        <Datasort
          data={props.users.data}
          defaultSortBy='name'
          render={({ data, sortBy }) => (
            <Table celled color='blue'>
              <Table.Header sortBy>
                <Table.Row>
                  <Table.HeaderCell textAlign='center'>
                    <Modal
                      trigger={<Button icon='plus' circular color='facebook' />}
                    >
                      <Modal.Header>Registrar novo Prestador</Modal.Header>
                      <Modal.Content image>
                        <RegisterUser />
                      </Modal.Content>
                    </Modal>
                    <b>CI</b>
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Nome</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>
                    Usuário
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>E-mail</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Acesso</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>
                    Ausente
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data &&
                  Object.keys(data).map(user => {
                    return (
                      <Table.Row key={user}>
                        <Table.Cell textAlign='center'>
                          <b>{data[user].ci}</b>
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {data[user].name}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {data[user].username}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {data[user].email_emp}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {data[user].role}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {data[user].absent === '1' ? (
                            <Icon
                              circular
                              inverted
                              color='green'
                              name='check'
                            />
                          ) : (
                            <Icon circular inverted color='red' name='times' />
                          )}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          <Button.Group>
                            <Button
                              positive
                              as={Link}
                              to={`/admin/users/${data[user].id}/edit`}
                            >
                              Editar
                            </Button>
                            <Button.Or text='<>' />
                            <Button
                              negative
                              onClick={() => handleClick(data[user].id)}
                            >
                              Remover
                            </Button>
                          </Button.Group>
                        </Table.Cell>
                        <Confirm
                          open={stateOpen}
                          onCancel={() => setStateOpen(false)}
                          onConfirm={() => handleConfirm(idUser)}
                          content='Você tem certeza que deseja excluir este usuário?'
                        />
                      </Table.Row>
                    )
                  })}
              </Table.Body>
            </Table>
          )}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(ActionCreators.getUsersRequest()),
    remove: id => dispatch(ActionCreators.removeUserRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
