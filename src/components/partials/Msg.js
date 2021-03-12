export default function Msg({ msg, isError }) {
  return (
    <p>
      <strong>{isError ? 'Error' : 'Success'}:&nbsp;</strong>{msg}
    </p>
  )
}