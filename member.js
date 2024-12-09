function skillsMember() {
    let member = {
        name: 'John',
        age: 30,
        skills: ['HTML', 'CSS', 'JS'],
        display: function () {
            console.log(this.name + ' has skills: ' + this.skills);
        }
    };
    member.display();
}