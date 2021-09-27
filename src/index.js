'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-02 14:52
* Desc: 
*/

import Vue from "vue";
import plugin from './_vue/plugin';
import './libs';
import './base';
import './notice';

export * from './form';

// plugin.
Vue.use(plugin());
