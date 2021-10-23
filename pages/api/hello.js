// https://nextjs.org/learn/basics/api-routes/creating-api-routes
// https://nextjs.org/learn/basics/api-routes/api-routes-details


export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' })
}