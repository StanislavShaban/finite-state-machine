class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

    constructor(config) {
    	if(config == null) throw new Error("Config isn't passed");
    	else{
    		this.config = config;
    		var initial_state = 'normal';
    		console.log(initial_state);
    		var previous_state = null;
    		var beforeChangeState = null;
    		var onChangeState = 0;
    	}
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	return this.config.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    	// var states = ["normal", "busy", "hungry", "sleeping"];
    	// var flag = 0;
    	// var i;
    	// for(i = 0; i < states.length; i++){
    	// 	if(state === states[i]) flag++;
    	// }
    	// if(flag === 0) throw new Error('No such state');
    	// else {
    	// 	this.config.initial = state;
    	// }
    	this.previous_state = this.config.initial;
    	var flag = 0;
    	for(var i in this.config.states){
    		if(i === state){
    			this.onChangeState++;
    			flag++;
    			this.beforeChangeState = this.config.initial;
    			this.config.initial = i;
    		}
    	}
    	if(flag === 0){
    		throw new Error('No such state');
    	}

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

  //   	var flag = 0;
  //   	for(var i in this.config.states){
  //   		if(i === this.config.initial){
		//     	for(var j in this.config.states[i].transitions){
		//     		if(j === event) {
		//     			flag++;
		//     			this.changeState(this.config.states[i].transitions[j]);
		//     		}
		//     	}
	 //    	}
		// }
		// if(flag === 0){
		// 	throw new Error('No such event in current state');
		// }
		// console.log(this.getState());

    	var flag = 0;
    	for(var i in this.config.states){
    		if(i === this.getState()){
    			for(var j in this.config.states[i].transitions){
    				if(j === event){
    					this.onChangeState++;
    					this.beforeChangeState = this.config.initial;
    					console.log(this.config.states[i].transitions[j]);
    					this.changeState(this.config.states[i].transitions[j]);
    					flag++;
    				}
    			}
    		}
    	}
    	if(flag === 0){
			throw new Error('No such event in current state');
    	}else{
    		
    	}		
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	this.changeState(this.initial_state);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	if(event == null){
    		return this.config.states;
    	}else{}
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
    	if(this.getState() === this.initial_state){
    		return false;
    	}else if(this.onChangeState !== 0){
    		this.changeState(this.bebeforeChangeState);
    		return true;
    	}else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
