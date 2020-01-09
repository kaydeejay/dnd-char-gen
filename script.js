$('document').ready(function() {
    $('#but_manual').click(function() {
        $('.manual_wrap').toggleClass('manual_open');
    });

    var myname = 'Nameless Hero';
    var myrace = 'Human';
    var myclass = 'Fighter';
    var mylvl = 1;
    var myport = '';
    var str_roll = 0;
    var dex_roll = 0;
    var int_roll = 0;
    var con_roll = 0;
    var rolls = 3;
    var str = 0;
    var dex = 0
    var con = 0;
    var int = 0;
    var str_base = 6;
    var dex_base = 6;
    var con_base = 6;
    var int_base = 6;
    var myhp = 1;
    var mysp = 0;
    var maxhp = 1;
    var maxsp = 0;
    var hitdice = 7;
    var str_bonus = 0;
    var dex_bonus = 0;
    var con_bonus = 0;
    var int_bonus = 0;
    var sp_multi = 0; //spell muliplier, attack and number
    var monster_hp = 0;
    var monster_ac = 10;
    var monster_rc = 10;
    var monster_type = 'goblin';
    var monster_ab = 0;
    var monster_db = 0;
    var monster_xp = 10;
    var d20
    var d4
    var d6
    var d8
    var d12
    var ac = 10;
    var rc = 10;
    var room = 0;
    var myab = 0; //attack bonus
    var mysb = 0; //spell attack bonus
    var ab_multi = 2; //attack multiplier
    var ac_multi = 0; //armor class multiplier
    var xp = 0;
    var roompic = 'generic';
    var mydamage;
    var dam_bonus;
    var atk_bonus;
    var armor = 10;
    var spell_dam;
    var m_armor = 0;
    var m_armor_count = 0;
    var droparray;
    var whatdrop;
    var hpots = 0;
    var whatroom;
    var potions = 1;

    var item_popup = function() {
        $('body').append("<div class='itempopup'><div class='itemwrapper'><div class='item " + whatdrop + "'></div><p>You found an item!<br>[" + whatdrop + "]<br>do you want to take it?<br><button id='item_y'>Yes</button><button id='item_n'>No</button></p></div></div>");
    };



    function itemdrop() {
        //drops ///  
        if (d6 == 1) { //mainhad
            droparray = Array("dagger", "shortsword", "shortbow", "spear", "longsword", "greatsword", "longbow", "dagger", "shortsword", "shortbow", "longsword");
            whatdrop = droparray[Math.floor(Math.random() * droparray.length)];
        } else if (d6 == 2) { //offhand
            droparray = Array("shield");
            whatdrop = droparray[Math.floor(Math.random() * droparray.length)];
        } else if (d6 == 3) { //armor
            droparray = Array("padded", "leather", "studdedleather", "chainmail", "splintmail", "platemail", "padded", "leather", "chainmail");
            whatdrop = droparray[Math.floor(Math.random() * droparray.length)];
        } else if (d6 == 4) { //spell
            droparray = Array("firebolt", "lightning", "acidblast", "fireball", "heal", "magearmor", "firebolt", "lightning", "heal", "knock", "knock");
            whatdrop = droparray[Math.floor(Math.random() * droparray.length)];
        } else { //potion
            whatdrop = "potion";
        }
    }

    //step actions/////////////
    ///////////////////////////////
    setInterval(function() {
        maxhp = hitdice + con_bonus + mylvl;
        if (myclass == "Fighter") {
            maxsp = 0;
        } else {
            maxsp = Math.round(sp_multi * mylvl) + (int_bonus * 2);
            if (maxsp < 0) {
                maxsp = 0
            };
        }

        mysb = Math.round((mylvl * sp_multi)) + int_bonus;

        mylvl = Math.round(1 + (xp / (100 + (xp / 4))));
        $('.hud_hp').html(myhp);
        $('.hud_sp').html(mysp);
        $('.max_hp').html(maxhp);
        $('.max_sp').html(maxsp);
        $('.hud_ab').html(myab);
        $('.hud_sb').html(mysb);
        $('.hud_ac').html(ac);
        $('#char_lvl').html(mylvl);
        $('.hud_xp').html(xp);
        $('.hud_pot').html(potions);

        d20 = (Math.floor(Math.random() * 20) + 1);
        d4 = (Math.floor(Math.random() * 4) + 1);
        d6 = (Math.floor(Math.random() * 6) + 1);
        d8 = (Math.floor(Math.random() * 8) + 1);
        d12 = (Math.floor(Math.random() * 12) + 1);

        //draw room picture
        if (whatroom == 'monster') {
            if (monster_hp > 0) {
                roompic = monster_type;
            } else {
                roompic = 'generic';
            }
        } else if (whatroom == 'chest') {
            roompic = 'chest';
        } else {
            roompic = 'door';
        }

        if (myhp > 0) {
            $('#mon').attr("class", roompic);
        } else {
            setTimeout(function() { //item popup
                $('#mon').attr("class", "gameover");
            }, 1200);
        }

        if (m_armor_count < 1) {
            m_armor = 0;
        }

        //inventory set///////      
        if (dam_bonus > -1) { var plusminus = '+' } else { plusminus = '' };

        if ($('#weapon_inv').val() == "dagger") {
            mydamage = d4;
            dam_bonus = str_bonus;
            myab = Math.round((mylvl / ab_multi)) + str_bonus;
            $('.hud_dmg').html('1d4' + plusminus + dam_bonus);
        };
        if ($('#weapon_inv').val() == "shortsword") {
            mydamage = d6;
            dam_bonus = str_bonus;
            myab = Math.round((mylvl / ab_multi)) + str_bonus;
            $('.hud_dmg').html('1d6' + plusminus + dam_bonus);
        };
        if ($('#weapon_inv').val() == "shortbow") {
            mydamage = d6;
            dam_bonus = dex_bonus;
            myab = Math.round((mylvl / ab_multi)) + dex_bonus;
            $('.hud_dmg').html('1d6' + plusminus + dam_bonus);
        };
        if ($('#weapon_inv').val() == "spear") {
            mydamage = d8;
            dam_bonus = str_bonus;
            myab = Math.round((mylvl / ab_multi)) + str_bonus;
            $('.hud_dmg').html('1d8' + plusminus + dam_bonus);
        };
        //martial weapons//////
        if (myclass !== "Fighter") {
            $('.martial').prop("disabled", true);
        } else {
            $('.martial').prop("disabled", false);
        }
        if ($('#weapon_inv').val() == "longsword") {
            mydamage = d8;
            dam_bonus = str_bonus;
            myab = Math.round((mylvl / ab_multi)) + str_bonus;
            $('.hud_dmg').html('1d8' + plusminus + dam_bonus);
        };
        if ($('#weapon_inv').val() == "greatsword") {
            mydamage = d12;
            dam_bonus = str_bonus;
            myab = Math.round((mylvl / ab_multi)) + str_bonus;
            $('.hud_dmg').html('1d12' + plusminus + dam_bonus);
        };
        if ($('#weapon_inv').val() == "longbow") {
            mydamage = d8;
            dam_bonus = dex_bonus;
            myab = Math.round((mylvl / ab_multi)) + dex_bonus;
            $('.hud_dmg').html('1d8' + plusminus + dam_bonus);
        };
        //two hand weapons//////
        if ($('#weapon_inv').children(':selected').hasClass('twohand')) {
            $('#offhand_inv').prop("disabled", true);
            $('#offhand_inv').val("none");
        } else {
            $('#offhand_inv').prop("disabled", false);
        }
        //armors/////
        if (myclass == "Mage") {
            $('#armor_inv').prop("disabled", true);
        } else {
            $('#armor_inv').prop("disabled", false);
        }
        if (myclass == "Rogue") {
            $('.heavy').prop("disabled", true);
        } else {
            $('.heavy').prop("disabled", false);
        }
        if ($('#armor_inv').val() == "none") {
            armor = 10;
            ac = armor + Math.round((ac_multi * (mylvl / 2))) + dex_bonus + m_armor;
        };
        if ($('#armor_inv').val() == "padded") {
            armor = 11;
            ac = armor + Math.round((ac_multi * (mylvl / 2))) + dex_bonus + m_armor;
        };
        if ($('#armor_inv').val() == "leather") {
            armor = 12;
            ac = armor + Math.round((ac_multi * (mylvl / 2))) + dex_bonus + m_armor;
        };
        if ($('#armor_inv').val() == "studdedleather") {
            armor = 13;
            ac = armor + Math.round((ac_multi * (mylvl / 2))) + dex_bonus + m_armor;
        };
        if ($('#armor_inv').val() == "chainmail") {
            armor = 14;
            ac = armor + Math.round((ac_multi * (mylvl / 2)));
        };
        if ($('#armor_inv').val() == "splintmail") {
            armor = 15;
            ac = armor + Math.round((ac_multi * (mylvl / 2)));
        };
        if ($('#armor_inv').val() == "platemail") {
            armor = 16;
            ac = armor + Math.round((ac_multi * (mylvl / 2)));
        };
        //shield//
        if ($('#offhand_inv').val() == "shield") {
            ac = ac + 2;
        };
        //spells/////
        if (int_bonus > -1) { var sp_plusminus = '+' } else { sp_plusminus = '' };

        if (myclass == "Fighter") {
            $('#spell_inv').prop("disabled", true);
        } else {
            $('#spell_inv').prop("disabled", false);
        }
        if ($('#spell_inv').val() == "none") {
            spell_dam = 0;
            $('.hud_spdmg').html('N/A');
        };
        if ($('#spell_inv').val() == "firebolt") {
            spell_dam = d6 + int_bonus;
            $('.hud_spdmg').html('1d6' + sp_plusminus + int_bonus);
        };
        if ($('#spell_inv').val() == "lightning") {
            spell_dam = (d6 * 2) + int_bonus;
            $('.hud_spdmg').html('2d6' + sp_plusminus + int_bonus);
        };
        if ($('#spell_inv').val() == "acidblast") {
            spell_dam = (d6 * 3) + int_bonus;
            $('.hud_spdmg').html('3d6' + sp_plusminus + int_bonus);
        };
        if ($('#spell_inv').val() == "fireball") {
            spell_dam = (d12 * 2) + int_bonus;
            $('.hud_spdmg').html('2d12' + sp_plusminus + int_bonus);
        };
        if ($('#spell_inv').val() == "heal") {
            spell_dam = 0;
            $('.hud_spdmg').html('N/A');
        };
        if ($('#spell_inv').val() == "magearmor") {
            spell_dam = 0;
            $('.hud_spdmg').html('N/A');
        };
        if (potions > 0) {
            $('#user_potion').prop("disabled", false);
        } else {
            $('#user_potion').prop("disabled", true);
        }

        //end inventory///

        //game over
        if (myhp < 1) {
            setTimeout(function() { //item popup
                $('#room_desc').html("You have been killed!<br>You made it through " + room + " rooms.<hr><span class='magenta'>Click anywhere to restart.</span>");
                $('.game_opts').detach();
                $('#toggle').detach();
                $('body').click(function() {
                    window.location.href = window.location.href;
                });
            }, 1200);
        }

    }, 500);
    //end step////////////////////////  

    /*char create*/
    $('#abl_roll').click(function() {
        $('#accept').prop("disabled", false);
        if (rolls == 1) {
            $('#abl_roll').remove();
        };
        if (rolls > 0) {
            str_roll = Math.floor(Math.random() * 10) + 1;
            dex_roll = Math.floor(Math.random() * 10) + 1;
            int_roll = Math.floor(Math.random() * 10) + 1;
            con_roll = Math.floor(Math.random() * 10) + 1;

            str = str_roll + str_base;
            dex = dex_roll + dex_base;
            int = int_roll + int_base;
            con = con_roll + con_base;
            $('#str_score').html(str);
            $('#dex_score').html(dex);
            $('#int_score').html(int);
            $('#con_score').html(con);

            rolls -= 1;
            $('#abl_roll').html('Re-roll? (' + rolls + ' rolls left)');
        };
    }); //end roll scores

    $('#race_pick').change(function() {
        if ($(this).val() == "human") {
            str_base = 6;
            dex_base = 6;
            con_base = 6;
            int_base = 6;
            myrace = 'Human';
        };
        if ($(this).val() == "elf") {
            str_base = 6;
            dex_base = 6;
            con_base = 4;
            int_base = 8;
            myrace = 'Elf';
        };
        if ($(this).val() == "dwarf") {
            str_base = 6;
            dex_base = 4;
            con_base = 8;
            int_base = 6;
            myrace = 'Dwarf';
        };
        if ($(this).val() == "halfling") {
            str_base = 4;
            dex_base = 8;
            con_base = 6;
            int_base = 6;
            myrace = 'Halfling';
        };
        if ($(this).val() == "orc") {
            str_base = 8;
            dex_base = 6;
            con_base = 6;
            int_base = 4;
            myrace = 'Orc';
        };

        str = str_roll + str_base;
        dex = dex_roll + dex_base;
        int = int_roll + int_base;
        con = con_roll + con_base;
        $('#str_score').html(str);
        $('#dex_score').html(dex);
        $('#int_score').html(int);
        $('#con_score').html(con);
    }); //end choose race

    $('#class_pick').change(function() { //choose class
        if ($(this).val() == "Fighter") {
            hitdice = 7;
            sp_multi = 0;
            ab_multi = 2;
            ac_multi = 0;
            myclass = 'Fighter';
            $('#weapon_inv').html('<option value="shortsword">shortsword</option>');
            $('#armor_inv').html('<option value="padded">padded</option>');
            $('#spell_inv').html('<option value="none">none</option>');
        };
        if ($(this).val() == "Mage") {
            hitdice = 5;
            sp_multi = 1;
            ab_multi = 4;
            ac_multi = 0;
            myclass = 'Mage';
            $('#weapon_inv').html('<option value="dagger">dagger</option>');
            $('#spell_inv').html('<option value="firebolt">firebolt</option><option value="heal">heal</option>');
            $('#armor_inv').html('<option value="none">none</option>');
        };
        if ($(this).val() == "Rogue") {
            hitdice = 6;
            sp_multi = .35;
            ab_multi = 3;
            ac_multi = .5;
            myclass = 'Rogue';
            $('#weapon_inv').html('<option value="shortbow" class="twohand">shortbow</option><option value="dagger">dagger</option>');
            $('#spell_inv').html('<option value="firebolt">firebolt</option>');
            $('#armor_inv').html('<option value="none">none</option>');
        };
    }); //end choose class

    $('#accept').click(function() {
        //set stats
        if (str + dex + int + con > 24) {
            str_bonus = Math.round((str - 11) / 2);
            dex_bonus = Math.round((dex - 11) / 2);
            int_bonus = Math.round((int - 11) / 2);
            con_bonus = Math.round((con - 11) / 2);
            myhp = hitdice + con_bonus + mylvl;
            maxhp = hitdice + con_bonus + mylvl;
            if (myclass == "Fighter") {
                mysp = 0;
                maxsp = mysp;
            } else {
                mysp = Math.round(sp_multi * mylvl) + (int_bonus * 2);
                maxsp = mysp;
            };
            if (mysp < 0) {
                mysp = 0
            };
            myname = $('#charname_input').val();
            $('#hud_name').html(myname);
            $('.hud_hp').html(myhp);
            $('.hud_sp').html(mysp);
            myport = $('#race_pick').val() + $('#gender_pick').val();
            $('.char_port').addClass(myport);
            $('#char_race').html(myrace);
            $('#char_class').html(myclass);
            $('#char_lvl').html(mylvl);
            $('#char_str').html(str);
            $('#char_dex').html(dex);
            $('#char_int').html(int);
            $('#char_con').html(con);
            $('#char_str_b').html(' [ ' + str_bonus + ' ]');
            $('#char_dex_b').html(' [ ' + dex_bonus + ' ]');
            $('#char_int_b').html(' [ ' + int_bonus + ' ]');
            $('#char_con_b').html(' [ ' + con_bonus + ' ]');
            $('.charcreate').detach();

            if (myclass == "Fighter") {
                $('#user_spell').prop("disabled", true);
            } else {
                $('#user_spell').prop("disabled", false);
            }

        } else {
            alert('Please roll your ability scores before proceeding.');
        }
    });
    /////////////////////////////////
    //game interface/////////////////

    var slide = 0
    $('#toggle').click(function() {
        if (slide == 1) {
            $(".wrap").animate({
                left: '-300'
            }, 350);
            slide = 0
        } else {
            $(".wrap").animate({
                left: '0'
            }, 350);
            slide = 1
        }
    }); //end open char screen

    $('#user_open').click(function() {
        var str1 = $('#room_desc').text();
        var str2 = "door";
        var str3 = "chest";
        var str4 = "monster";
        var str5 = "locked";
        var str6 = "budge";

        if (str1.indexOf(str2) != -1) { //if there is a door
            var results = Array("It is easily pushed open.", "It is locked");
            var outcome = results[Math.floor(Math.random() * results.length)];
            $('#room_desc').html(outcome);

        } else if (str1.indexOf(str3) != -1) { //if there is a chest
            var results = Array("It opens easily, revealing some valuable treasure!", "You try to open it, but the top won't budge.");
            var outcome = results[Math.floor(Math.random() * results.length)];
            $('#room_desc').html(outcome);
            if (outcome == "It opens easily, revealing some valuable treasure!") {
                setTimeout(function() { //item popup
                    itemdrop(1, false);
                    item_popup();
                }, 600); //end item popup
            };

        } else if (str1.indexOf(str4) != -1) { //if there is a monster
            $('#room_desc').html("There is nothing to open here... just a very angry looking " + monster_type + "<em>monster</em>.");

        } else if (str1.indexOf(str5) != -1) { //if there is a lock
            $('#room_desc').html("It is still locked tightly.");

        } else if (str1.indexOf(str6) != -1) { //if there is a budge
            $('#room_desc').html("The top still won't budge.");

        } else { //all clear
            $('#room_desc').html('There is nothing to open here.');
        }
    }); //end user open

    $('#user_pick').click(function() {
        var str1 = $('#room_desc').text();
        var str2 = "door";
        var str3 = "chest";
        var str4 = "locked";
        var str5 = "budge";
        var str6 = "monster";

        if (str1.indexOf(str2) != -1) { //if there is a door
            $('#room_desc').html("You're not even sure if the door is locked.");

        } else if (str1.indexOf(str3) != -1) { //if there is a chest
            $('#room_desc').html("You're not even sure if the chest is locked.");

        } else if (str1.indexOf(str4) != -1) { //if door is locked
            var pick_roll = d20 + dex_bonus
            if (pick_roll > 10) { //picked it sucess
                $('#room_desc').html('You successfully pick the lock!');
            } else { //pick not success
                var trap_dam = d4;
                $('#room_desc').html("It opens, but you've triggered a trap, taking " + trap_dam + " damage!");
                myhp -= trap_dam;
            }

        } else if (str1.indexOf(str5) != -1) { //if chest is locked
            var pick_roll = d20 + dex_bonus
            if (pick_roll > 10) { //picked it sucess
                $('#room_desc').html('The lock clicks as the top swings open, revealing some valuable treasure!');
                setTimeout(function() { //item popup
                    itemdrop(1, false);
                    item_popup();
                }, 600); //end item popup
            } else { //pick not success
                var trap_dam = d4;
                $('#room_desc').html("You fail at picking the lock, it snaps shut permanently and you take " + trap_dam + " damage!");
                myhp -= trap_dam;
            }

        } else if (str1.indexOf(str6) != -1) { //if there is a monster
            $('#room_desc').html("Hey klepto, you should probably take care of that " + monster_type + "<em>monster</em>!");

        } else { //all clear
            $('#room_desc').html('There are no locks to pick here.');
        }
    }); //end user pick

    $(document).on("click", "#user_attack", function() {
        var str1 = $('#room_desc').text();
        var str2 = "locked";
        var str3 = "budge";
        var str4 = "monster";
        var str5 = "door";
        var str6 = "chest";

        if (str1.indexOf(str2) != -1) { //force door lock
            var bash_roll = d20 + str_bonus
            if (bash_roll > 10) { // sucess
                $('#room_desc').html('Rawr! You smash it down!');
            } else { //failure
                var door_dam = Math.round((d4) / 2);
                $('#room_desc').html("You ram with your shoulder, but it remains tightly locked.  You take " + door_dam + " damage from the jarring impact.");
                myhp -= door_dam;
            }

        } else if (str1.indexOf(str3) != -1) { //force chest lock
            var bash_roll = d20 + str_bonus
            if (bash_roll > 15) { //sucess
                $('#room_desc').html('You bash the top in, revealing some valuable treasure!');
                setTimeout(function() { //item popup
                    itemdrop(1, false);
                    item_popup();
                }, 600); //end item popup
            } else { //failure
                $('#room_desc').html("The lid shutters from your blow and caves in, destroying anything that might have been of value.");
            }

        } else if (str1.indexOf(str5) != -1) { //if there is a door   
            $('#room_desc').html("You think to yourself, 'Why kick in the door when I could just try to open it first?'");

        } else if (str1.indexOf(str6) != -1) { //if there is a chest    
            $('#room_desc').html("You don't want to damage any valuables that might be in the chest... maybe you should try to open it first.");

        } else if (str1.indexOf(str4) != -1) { //monster     
            var user_atk = d20 + myab;
            var user_dam = mydamage + dam_bonus;
            if (user_atk > monster_ac) { //user attack
                $('#room_desc').html("You attack the " + monster_type + "<em>monster</em>, dealing " + user_dam + " damage to it.");
                monster_hp -= user_dam;
            } else {
                $('#room_desc').html("You attack the " + monster_type + "<em>monster</em>, but it dodges out of the way!");
            } //end user attack

            $('#user_attack').prop("disabled", true);
            $('#user_spell').prop("disabled", true);

            setTimeout(function() { //monster attack
                if (monster_hp < 1) { //kill monster
                    $('#room_desc').html("You have slain the " + monster_type + "!");
                    xp += monster_xp;
                    if (d4 == 4) {
                        setTimeout(function() { //item popup
                            itemdrop(1, false);
                            item_popup();
                        }, 600); //end item popup
                    }
                } else {
                    var mon_atk = d20 + monster_ab;
                    var mon_dam = d6 + monster_db;
                    if (mon_dam < 1) {
                        mon_dam = 1
                    };
                    if (mon_atk > ac) {
                        $('#room_desc').html("The " + monster_type + "<em>monster</em> attacks and hits you for " + mon_dam + " damage!");
                        myhp -= mon_dam;
                    } else {
                        $('#room_desc').html("The " + monster_type + "<em>monster</em> attacks you and misses!");
                    }
                }
                $('#user_attack').prop("disabled", false);
                if (myclass !== 'Fighter') {
                    $('#user_spell').prop("disabled", false);
                }
            }, 1200); //end monster attack

        } else { //all clear
            $('#room_desc').html('You attack the darkness.');
        }

    }); //end user attack 

    $('#user_spell').click(function() {
        var str1 = $('#room_desc').text();
        var str2 = "locked";
        var str3 = "budge";
        var str4 = "monster";
        var str5 = "door";
        var str6 = "chest";

        if (str1.indexOf(str2) != -1) { //if there is a locked door
            if ($('#spell_inv').val() == 'knock') {
                if (mysp > 1) {
                    $('#room_desc').html("You cast knock and it swings open!");
                    mysp -= 2
                } else { //not enough mana
                    $('#room_desc').html("You don't have enough spellpoints to cast this spell<em>locked</em>.");
                }

            } else if ($('#spell_inv').val() == 'heal') {
                if (mysp > 0) {
                    var heal = (d4) + int_bonus;
                    myhp += heal;
                    $('#room_desc').html("You cast heal and gain " + heal + " hitpoints.<em>locked</em>");
                    if (myhp > maxhp) {
                        myhp = maxhp;
                    }
                    mysp -= 1;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that.<em>locked</em>");
                }

            } else if ($('#spell_inv').val() == 'magearmor') {
                if (mysp > 2) {
                    m_armor = int_bonus;
                    m_armor_count = int_bonus + mylvl;
                    $('#room_desc').html("You cast mage armor on yourself, and are surrounded by a wall of force.<em>locked</em>");
                    if (myhp > maxhp) {
                        myhp = maxhp;
                    }
                    mysp -= 3;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that.<em>locked</em>");
                }

            } else { //not knock equiped
                $('#room_desc').html("Your currently equipped spell won't have any effect on that<em>locked</em>.");
            }

        } else if (str1.indexOf(str3) != -1) { //if there is a locked chest
            if ($('#spell_inv').val() == 'knock') {
                if (mysp > 1) {
                    $('#room_desc').html("You cast knock and it pops open to reveal some valuable treasure!");
                    setTimeout(function() { //item popup
                        itemdrop(1, false);
                        item_popup();
                    }, 600); //end item popup
                    mysp -= 2
                } else { //not enough mana
                    $('#room_desc').html("You don't have enough spellpoints to cast this spell<em>budge</em>.");
                }
            } else if ($('#spell_inv').val() == 'heal') {
                if (mysp > 0) {
                    var heal = (d4) + int_bonus;
                    myhp += heal;
                    $('#room_desc').html("You cast heal and gain " + heal + " hitpoints.<em>budge</em>");
                    if (myhp > maxhp) {
                        myhp = maxhp;
                    }
                    mysp -= 1;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that.<em>budge</em>");
                }

            } else if ($('#spell_inv').val() == 'magearmor') {
                if (mysp > 2) {
                    m_armor = int_bonus;
                    m_armor_count = int_bonus + mylvl;
                    $('#room_desc').html("You cast mage armor on yourself, and are surrounded by a wall of force.<em>budge</em>");
                    if (myhp > maxhp) {
                        myhp = maxhp;
                    }
                    mysp -= 3;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that.<em>budge</em>");
                }

            } else { //not knock equiped
                $('#room_desc').html("Your currently equipped spell won't have any effect on that<em>budge</em>.");
            }

        } else if (str1.indexOf(str5) != -1) { //if there is a door    
            if ($('#spell_inv').val() == 'heal') {
                if (mysp > 0) {
                    var heal = (d4) + int_bonus;
                    myhp += heal;
                    $('#room_desc').html("You cast heal and gain " + heal + " hitpoints.<em>door</em>");
                    if (myhp > maxhp) {
                        myhp = maxhp;
                    }
                    mysp -= 1;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that.<em>door</em>");
                }

            } else if ($('#spell_inv').val() == 'magearmor') {
                if (mysp > 2) {
                    m_armor = int_bonus;
                    m_armor_count = int_bonus + mylvl;
                    $('#room_desc').html("You cast mage armor on yourself, and are surrounded by a wall of force.<em>door</em>");
                    if (myhp > maxhp) {
                        myhp = maxhp;
                    }
                    mysp -= 3;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that.<em>door</em>");
                }

            } else { //not knock equiped
                $('#room_desc').html("Your currently equipped spell won't have any effect on that<em>door</em>.");
            }

        } else if (str1.indexOf(str6) != -1) { //if there is a chest    
            if ($('#spell_inv').val() == 'heal') {
                if (mysp > 0) {
                    var heal = (d4) + int_bonus;
                    myhp += heal;
                    $('#room_desc').html("You cast heal and gain " + heal + " hitpoints.<em>chest</em>");
                    if (myhp > maxhp) {
                        myhp = maxhp;
                    }
                    mysp -= 1;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that.<em>chest</em>");
                }

            } else if ($('#spell_inv').val() == 'magearmor') {
                if (mysp > 2) {
                    m_armor = int_bonus;
                    m_armor_count = int_bonus + mylvl;
                    $('#room_desc').html("You cast mage armor on yourself, and are surrounded by a wall of force.<em>chest</em>");
                    if (myhp > maxhp) {
                        myhp = maxhp;
                    }
                    mysp -= 3;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that.<em>chest</em>");
                }

            } else { //not knock equiped
                $('#room_desc').html("Your currently equipped spell won't have any effect on that<em>chest</em>.");
            }

        } else if (str1.indexOf(str4) != -1) { //monster     
            if ($('#spell_inv').val() == 'firebolt') {
                if (mysp > 0) {
                    $('#room_desc').html("A firebolt leaps forth at the " + monster_type + "<em>monster</em>, dealing " + spell_dam + " damage to it.");
                    monster_hp -= spell_dam;
                    mysp -= 1;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that at the" + monster_type + "<em>monster</em>.");
                }
            }; //end firebolt

            if ($('#spell_inv').val() == 'lightning') {
                if (mysp > 1) {
                    $('#room_desc').html("A bolt of energy arcs towards the " + monster_type + "<em>monster</em>, dealing " + spell_dam + " damage to it.");
                    monster_hp -= spell_dam;
                    mysp -= 2;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that at the" + monster_type + "<em>monster</em>.");
                }
            }; //end lightning

            if ($('#spell_inv').val() == 'acidblast') {
                if (mysp > 2) {
                    $('#room_desc').html("Green acid covers the " + monster_type + "<em>monster</em>, dealing " + spell_dam + " damage to it.");
                    monster_hp -= spell_dam;
                    mysp -= 3;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that at the" + monster_type + "<em>monster</em>.");
                }
            }; //end acidblast

            if ($('#spell_inv').val() == 'fireball') {
                if (mysp > 3) {
                    $('#room_desc').html("A huge ball of fire explodes on the " + monster_type + "<em>monster</em>, dealing " + spell_dam + " damage.");
                    monster_hp -= spell_dam;
                    mysp -= 4;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that at the" + monster_type + "<em>monster</em>.");
                }
            }; //end fireball

            if ($('#spell_inv').val() == 'heal') {
                if (mysp > 0) {
                    var heal = (d4) + int_bonus;
                    myhp += heal;
                    $('#room_desc').html("You cast heal and gain " + heal + " hitpoints.<em>monster</em>");
                    if (myhp > maxhp) {
                        myhp = maxhp;
                    }
                    mysp -= 1;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that.<em>monster</em>");
                }
            }; //end heal

            if ($('#spell_inv').val() == 'magearmor') {
                if (mysp > 2) {
                    m_armor = int_bonus;
                    m_armor_count = int_bonus + mylvl;
                    $('#room_desc').html("You cast mage armor on yourself, and are surrounded by a wall of force.<em>monster</em>");
                    if (myhp > maxhp) {
                        myhp = maxhp;
                    }
                    mysp -= 3;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that.<em>monster</em>");
                }
            }; //end mage armor

            if ($('#spell_inv').val() == 'knock') {
                if (mysp > 1) {
                    $('#room_desc').html("You cast knock at the " + monster_type + "<em>monster</em>, but it is ineffective!");
                    mysp -= 2;
                } else {
                    $('#room_desc').html("You don't have enough spellpoints to cast that at the" + monster_type + "<em>monster</em>.");
                }
            }; //end knock

            if ($('#spell_inv').val() == 'none') {
                $('#room_desc').html("You don't have a spell ready, the " + monster_type + "<em>monster</em> gets a free attack against you!");
            }; //end no spell

            $('#user_spell').prop("disabled", true);
            $('#user_attack').prop("disabled", true);

            setTimeout(function() { //monster attack
                if (monster_hp < 1) { //kill monster
                    $('#room_desc').html("You have slain the " + monster_type + "!");
                    xp += monster_xp;
                    if (d4 == 4) {
                        setTimeout(function() { //item popup
                            itemdrop(1, false);
                            item_popup();
                        }, 600); //end item popup
                    }
                } else {
                    var mon_atk = d20 + monster_ab;
                    var mon_dam = d6 + monster_db;
                    if (mon_dam < 1) {
                        mon_dam = 1
                    };
                    if (mon_atk > ac) {
                        $('#room_desc').html("The " + monster_type + "<em>monster</em> attacks and hits you for " + mon_dam + " damage!");
                        myhp -= mon_dam;
                    } else {
                        $('#room_desc').html("The " + monster_type + "<em>monster</em> attacks you and misses!");
                    }
                }
                if (myclass !== 'Fighter') {
                    $('#user_spell').prop("disabled", false);
                }
                $('#user_attack').prop("disabled", false);
            }, 1200); //end monster attack

        } else { //all clear
            $('#room_desc').html('There is nothing to cast a spell at here.');
        }

    }); //end user spell

    $('#user_move').click(function() {
        var str1 = $('#room_desc').text();
        var str2 = "door";
        var str3 = "locked";
        var str4 = "monster";

        if (str1.indexOf(str2) != -1) { //if there is a door
            $('#room_desc').html('The door is closed.');

        } else if (str1.indexOf(str3) != -1) { //door locked
            $('#room_desc').html("You're still locked in.");

        } else if (str1.indexOf(str4) != -1) { //monster
            $('#room_desc').html("You can't get past the " + monster_type + " <em>monster</em> without fighting it.");

        } else { //go to next room
            $('#room_pic').addClass('roomfade');
            setTimeout(function() { //pic fade
                $('#room_pic').removeClass('roomfade');
            }, 1000);
            room += 1;
            m_armor_count -= 1;

            var roomarray = Array("chest", "door", "door", "monster", "monster");
            whatroom = roomarray[Math.floor(Math.random() * roomarray.length)];
            //choose monster
            var mon_array = Array(1, 1, 2, 2, 3, 3, 4);
            var pick_mon = (mon_array[Math.floor(Math.random() * mon_array.length)]) * mylvl;

            if (pick_mon < 4) { //0-3
                monster_type = "goblin";
                monster_ac = 8;
                monster_hp = 4;
                monster_rc = 10;
                monster_ab = -3;
                monster_db = -d4;
                monster_xp = 20;
            }
            if (pick_mon > 3 && pick_mon < 7) { //3-6
                monster_type = "skeleton";
                monster_ac = 10;
                monster_hp = 5;
                monster_rc = 10;
                monster_ab = 0;
                monster_db = 0;
                monster_xp = 40;
            }
            if (pick_mon > 6 && pick_mon < 11) { //7-10
                monster_type = "bugbear";
                monster_ac = 12;
                monster_hp = 8;
                monster_rc = 10;
                monster_ab = 1;
                monster_db = 2;
                monster_xp = 90;
            }
            if (pick_mon > 10 && pick_mon < 15) { //11-14
                monster_type = "beholder";
                monster_ac = 14;
                monster_hp = 12;
                monster_rc = 10;
                monster_ab = 3;
                monster_db = 2;
                monster_xp = 150;
            }
            if (pick_mon > 14 && pick_mon < 19) { //15-18
                monster_type = "lich";
                monster_ac = 16;
                monster_hp = 20;
                monster_rc = 10;
                monster_ab = 5;
                monster_db = 2;
                monster_xp = 300;
            }
            if (pick_mon > 18) { //19+
                monster_type = "dragon";
                monster_ac = 20;
                monster_hp = 40;
                monster_rc = 10;
                monster_ab = 8;
                monster_db = 2;
                monster_xp = 700;
            }

            if (whatroom == "monster") {
                var mon_adj = ['vicious', 'hungry', 'creepy', 'menacing', 'ravening'][Math.floor(Math.random() * 5)];
                $('#room_desc').html("A " + mon_adj + " " + monster_type + " <em>monster</em> appears!");

            } else if (whatroom == "door") {
                var room_type = ['hall', 'chamber', 'room', 'passage', 'corridor'][Math.floor(Math.random() * 5)];
                var room_adj = ['A lonely ', 'A derelict ', 'An abandoned ', 'A dank ', 'A dark ', 'A cavernous '][Math.floor(Math.random() * 6)];
                var door_adj = ['simple wooden', 'reinforced', 'strong oak', 'rusty iron', 'finely carved'][Math.floor(Math.random() * 5)];
                $('#room_desc').html(room_adj + room_type + " extends out before you.  There is a " + door_adj + " door on the opposite side.");

            } else {
                var chest_pos = ['in the center of', 'in a dimly-lit corner of', 'on a pedestal in', 'in a dark recess of', 'lit by braziers in'][Math.floor(Math.random() * 5)];
                var chest_adj = ['an ornate', 'a finely-crafted', 'an old, worn', 'a beautifully carved', 'a tarnished silver'][Math.floor(Math.random() * 5)];
                $('#room_desc').html("There is " + chest_adj + " chest " + chest_pos + " this room.");
            }

        }; //end go to next room
    }); //end user move

    /*take / leave item*/
    $(document).on("click", "#item_y", function() {
        if (whatdrop == "dagger" || whatdrop == "shortsword") {
            $('#weapon_inv').append('<option value="' + whatdrop + '">' + whatdrop + '</option>');
        } else if (whatdrop == "shortbow" || whatdrop == "spear") {
            $('#weapon_inv').append('<option value="' + whatdrop + '" class="twohand">' + whatdrop + '</option>');
        } else if (whatdrop == "longsword") {
            $('#weapon_inv').append('<option value="' + whatdrop + '" class="martial">' + whatdrop + '</option>');
        } else if (whatdrop == "greatsword" || whatdrop == "longbow") {
            $('#weapon_inv').append('<option value="' + whatdrop + '" class="twohand martial">' + whatdrop + '</option>');
        } else if (whatdrop == "padded" || whatdrop == "leather" || whatdrop == "studdedleather") {
            $('#armor_inv').append('<option value="' + whatdrop + '">' + whatdrop + '</option>');
        } else if (whatdrop == "chainmail" || whatdrop == "splintmail" || whatdrop == "platemail") {
            $('#armor_inv').append('<option value="' + whatdrop + '" class="heavy">' + whatdrop + '</option>');
        } else if (whatdrop == "shield") {
            $('#offhand_inv').append('<option value="' + whatdrop + '">' + whatdrop + '</option>');
        } else if (whatdrop == "firebolt" || whatdrop == "lightning" || whatdrop == "acidblast" || whatdrop == "fireball" || whatdrop == "heal" || whatdrop == "magearmor" || whatdrop == "knock") {
            $('#spell_inv').append('<option value="' + whatdrop + '">' + whatdrop + '</option>');
        } else {
            potions += 1;
        }
        $('.itempopup').detach();
    });
    $(document).on("click", "#item_n", function() {
        $('.itempopup').detach();
    });

    $('#user_potion').click(function() {
        if (potions > 0) {
            var pot_heal = (d4) * 2;
            var pot_spell = d6;
            myhp += pot_heal;
            if (myhp > maxhp) {
                myhp = maxhp;
            };
            mysp += pot_spell;
            if (mysp > maxsp) {
                mysp = maxsp;
            };
            potions -= 1;
        };
    });

}); //end doc ready