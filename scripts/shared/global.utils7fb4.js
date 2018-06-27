Utils =
{
	stopPropagation : function(e)
	{
		GlobalUtils.stopEventPropagation(e);
	},

	getRoomAvatarUrl : function(id)
	{
		return '/Resources/Website/Chatrooms/' + id + '.png';
	},

	getUserAvatarUrl : function(id)
	{
		return '/Resources/Website/Users/' + id + '/default.png';
	}
};

GlobalUtils = (function()
{
	// TODO: renamed, keeping old dependency
	stopEventPropagation = function(eventObject)
	{
		if (eventObject)
		{
			if (eventObject.stopPropagation)
			{
				eventObject.stopPropagation();
			}
			else
			{ // IE8 hack
				eventObject.cancelBubble = true;
				eventObject.returnValue = false;
			}
		}
	};

	var getAvatarUrl = function(userUuid)
	{
		return '/Resources/Website/Users/' + userUuid + '/default.png';
	};

	var getChatroomAvatarUrl = function(chatroomId)
	{
		return '/Resources/Website/Chatrooms/' + chatroomId + '.png';
	};

	var _return =
	{
		stopEventPropagation : stopEventPropagation,
		getAvatarUrl : getAvatarUrl,
		getChatroomAvatarUrl : getChatroomAvatarUrl
	}

	return _return;

})();

// TODO: Remove the object once nothing is dependent on it.
var com = com || {};
com.echat = com.echat || {};
com.echat.shared = com.echat.shared || {};

com.echat.shared.GlobalUtils =
{
	stopEventPropagation : function(eventObject)
	{
		if (eventObject)
		{
			if (eventObject.stopPropagation)
			{
				eventObject.stopPropagation();
			}
			else
			{ // IE8 hack
				eventObject.cancelBubble = true;
				eventObject.returnValue = false;
			}
		}
	},

	refreshInterface : function()
	{
		com.echat.shared.chatroom.Controller.refreshChatroomInterface();
		com.echat.shared.conversation.Controller.refreshAllConversations();

		com.echat.shared.context.Ignored.refreshList();
		com.echat.shared.context.Friends.refreshList();

		com.echat.shared.conversation.permissions.Controller.refreshDisplay();

		if (com.echat.widget && com.echat.widget.column)
		{
			com.echat.widget.column.display.Account.refreshAccountLayer();

			com.echat.widget.column.display.Controller.refreshLayer();
		}
	},

	getAvatarUrl : function(userUuid)
	{
		return '/Resources/Website/Users/' + userUuid + '/default.png';
	},

	getChatroomAvatarUrl : function(chatroomId)
	{
		return '/Resources/Website/Chatrooms/' + chatroomId + '.png';
	}
};
