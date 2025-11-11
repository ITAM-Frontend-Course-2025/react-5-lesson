type Props = { name: string; age?: number }

function UserCard(props: Props) {
  const { name, age } = props
  return <div className="root">updated: {name} {typeof age==='number' ? '('+age+')' : ''}</div>
}

export default function Task() {
  return <UserCard name="Ann" age={23} />
}
