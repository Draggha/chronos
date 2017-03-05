import Ember from 'ember'

const { String: { htmlSafe }, Route } = Ember

export default Route.extend({
  model () {
    return {
      name: 'Draggha',
      avatar: 'https://s-media-cache-ak0.pinimg.com/564x/4e/10/b6/4e10b6ce0bdf2ad332f580293c25733b.jpg',
      avatarLabel: 'Portrait of the orc prince Draggha',
      details: htmlSafe(`
<p>Age: 30</p>
<p>Son of the Clan leader</p>
`),
      story: htmlSafe(`
<p>Born as a prince of the mightiest of clans, Draggha was a very capable combatant. But what made him really stand out was his skill in leadership and his unwavering sense of morale.</p>
<p>When his father declared war upon the other clans, Draggha took all warriors that were loyal to him and defended the weaker clans.</p>
<p>Many clans were inspired by his courage and joined him in battle. They eventually stopped his father and Draggha killed him in a duell.</p>
<p>As the new clan leader he united most of the clans and invited them to form a council to lead their people together; in peace.</p>
`)
    }
  }
})
