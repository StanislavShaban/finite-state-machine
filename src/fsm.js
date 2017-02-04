class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

    constructor(config) {
    	if(config == null){
    		throw new Error('Config isnt passed');
    	}

    	this.config = config;
    	this.active_state = config.initial;
    	this.config_original = config;
    	this.onChanged = 0;
    	this.previousState = null;
    	this.undo_history = new Array();
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	return this.active_state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    	var flag = 0;
    	for(var i in this.config.states){
    		if(i === state){
    			this.onChanged++;
    			this.previousState = this.active_state;
    			this.active_state = i;
    			flag++;
    		}
    	}

    	if(flag === 0){
    		throw new Error('No such state found');
    	}

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    	var flag = 0;
    	for(var i in this.config.states){
    		if(i === this.getState()){
    			for(var j in this.config.states[i].transitions){
    				if(j === event){
    					flag++;
    					this.onChanged++;
    					this.changeState(this.config.states[i].transitions[j]);
    				}
    			}
    		}
    	}
    	if(flag === 0){
    		throw new Error('No such event found');
    	}
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	this.active_state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	var states = [];
    	var j = 0;
    	if(event == null){
    		for(var i in this.config.states){
    			states[j] = i;
    			j++;
    		}
    		return states;
    	}else if(event != null){
    		for(var i in this.config.states){
    			for(var k in this.config.states[i].transitions){
    				if(k === event){
	    				states[j] = i;
	    				j++;
    				}
    			}
    		}
    		return states;
    	}
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
    	if(this.getState() === this.config.initial){
    		return false;
    	}else if(this.onChanged !== 0){
    		this.onChanged = 0;
    		this.undo_history.push(this.active_state);
    		this.changeState(this.previousState);
    		return true;
    	}
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
    	if(this.getState() === this.config.initial){
    		return false;
    	}else if(this.onChanged !== 0){
    		return false;
    	}else if(this.undo_history.length != 0){
    		this.active_state = this.undo_history.pop();
    		
    		return true;
    	}else if(this.undo_history.length === 0){
    		return false;
    	}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    	this.undo_history = null;
    	this.active_state = this.config.initial;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
