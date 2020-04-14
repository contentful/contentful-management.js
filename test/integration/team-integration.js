export default function teamTests (t, organization) {
  t.test('Gets teams', (t) => {
    t.plan(3)
    return organization.getTeams()
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.items, 'items')
        t.ok(response.items[0].sys.type, 'Team')
      })
  })

  t.test('Gets team', (t) => {
    t.plan(4)
    return organization.getTeam('7pIEx2fMx53SSR1jd7C46M')
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.sys.id, '7pIEx2fMx53SSR1jd7C46M')
        t.ok(response.sys.type, 'Team')
        t.ok(response.name, 'SDK test team [DO NOT DELETE]')
      })
  })

  t.test('Create and delete team', (t) => {
    t.plan(4)
    return organization.createTeam({
      name: 'test team'
    })
      .then(async (team) => {
        t.ok(team.sys, 'sys')
        t.equal(team.name, 'test team')
        t.ok(team.sys.type, 'Team')
        await team.delete()
        t.pass('team was deleted')
      })
  })
}
