type Props = any // TODO: типизируйте пропсы

function UserCard(props: Props) {
  return <div className="root">render</div>
}

export default function Task() {
  return <UserCard name="Ann" />
}
