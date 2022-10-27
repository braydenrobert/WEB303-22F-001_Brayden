/*
    Assignment 05
*/

$(document).ready(function () {
    const item = {
        id: 1,
        name: 'SUPER PEOPLE',
        description:
            'battle royale game developed by South Korean studio Wonder People, and published by Wonder Games.',
        genre: 'Battle Royale',
    };

    const contentItem = new ContentItem(
        item.id,
        item.name,
        item.description,
        item.genre
    );

    $('#content-item-list').append(contentItem.toString());
});

class ContentItem {
    constructor(id, name, description, genre) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.genre = genre;
    }
    updateContentItem(id, name, description, genre) {
        if (this.id === id && name && description && genre) {
            this.name = name;
            this.description = description;
            this.genre = genre;
        }
    }
    toString() {
        return `
    <div class="content-item-wrapper" id="content-item-${this.id}">
    <h2>${this.name}</h2>
    <p>${this.description}</p>
    <div>${this.genre}</div>
    </div>
    `;
    }
	
	const characters = ["Gatling Soldier", "Gas Soldier", "Nuclear", "Shotgun Master", "Strike Force"];
	
	$("content-item-wrapper").css('border', '1px solid black');
	$("content-item-wrapper").css('border-width', '1px');
	$("content-item-wrapper").css('padding', '25px 50px 75px 100px');
}
