var rules = {};
rules[','] = [[1, [',', 'DET', 'N']]];
rules['.'] = [[1/3, ['.', 'DET', 'N']]];
rules['.'] = rules['.'].concat([[2/3, ['.', 'PRO', 'V']]]);
rules['.'] = rules['.'].concat([[1, ['.', 'PRO', 'VD']]]);
rules['ADJ'] = [[1/7, ['ADJ', 'ADJ', 'N']]];
rules['ADJ'] = rules['ADJ'].concat([[2/7, ['ADJ', 'N', ',']]]);
rules['ADJ'] = rules['ADJ'].concat([[3/7, ['ADJ', 'N', '.']]]);
rules['ADJ'] = rules['ADJ'].concat([[4/7, ['ADJ', 'N', 'CNJ']]]);
rules['ADJ'] = rules['ADJ'].concat([[5/7, ['ADJ', 'N', 'N']]]);
rules['ADJ'] = rules['ADJ'].concat([[6/7, ['ADJ', 'N', 'P']]]);
rules['ADJ'] = rules['ADJ'].concat([[1, ['ADJ', 'N', 'V']]]);
rules['ADV'] = [[1, ['ADV', 'P', 'DET']]];
rules['CNJ'] = [[1/3, ['CNJ', 'ADJ', 'N']]];
rules['CNJ'] = rules['CNJ'].concat([[2/3, ['CNJ', 'DET', 'N']]]);
rules['CNJ'] = rules['CNJ'].concat([[1, ['CNJ', 'PRO', 'V']]]);
rules['DET'] = [[1/8, ['DET', 'ADJ', 'N']]];
rules['DET'] = rules['DET'].concat([[2/8, ['DET', 'DET', 'N']]]);
rules['DET'] = rules['DET'].concat([[3/8, ['DET', 'N', ',']]]);
rules['DET'] = rules['DET'].concat([[4/8, ['DET', 'N', '.']]]);
rules['DET'] = rules['DET'].concat([[5/8, ['DET', 'N', 'CNJ']]]);
rules['DET'] = rules['DET'].concat([[6/8, ['DET', 'N', 'N']]]);
rules['DET'] = rules['DET'].concat([[7/8, ['DET', 'N', 'P']]]);
rules['DET'] = rules['DET'].concat([[1, ['DET', 'N', 'V']]]);
// this is extra;
rules['MOD'] = [[1, ['MOD']]];
rules['N'] = [[1/18, ['N', ',', 'CNJ']]];
rules['N'] = rules['N'].concat([[2/18, ['N', ',', 'DET']]]);
rules['N'] = rules['N'].concat([[3/18, ['N', ',', 'N']]]);
rules['N'] = rules['N'].concat([[4/18, ['N', '.', 'DET']]]);
rules['N'] = rules['N'].concat([[5/18, ['N', '.', 'PRO']]]);
rules['N'] = rules['N'].concat([[6/18, ['N', 'CNJ', 'DET']]]);
rules['N'] = rules['N'].concat([[7/18, ['N', 'CNJ', 'N']]]);
rules['N'] = rules['N'].concat([[8/18, ['N', 'MOD', 'V']]]);
rules['N'] = rules['N'].concat([[9/18, ['N', 'N', ',']]]);
rules['N'] = rules['N'].concat([[10/18, ['N', 'N', '.']]]);
rules['N'] = rules['N'].concat([[11/18, ['N', 'N', 'P']]]);
rules['N'] = rules['N'].concat([[12/18, ['N', 'P', 'ADJ']]]);
rules['N'] = rules['N'].concat([[13/18, ['N', 'P', 'DET']]]);
rules['N'] = rules['N'].concat([[14/18, ['N', 'P', 'N']]]);
// rules['N'] = [15/18, ['N', 'P', 'NP']];
rules['N'] =  rules['N'].concat([[16/18, ['N', 'P', 'PRO']]]);
rules['N'] = rules['N'].concat([[17/18, ['N', 'TO', 'V']]]);
rules['N'] = rules['N'].concat([[1, ['N', 'V', 'VN']]]);
rules['P'] = [[1/9, ['P', 'ADJ', 'N']]];
rules['P'] = rules['N'].concat([[2/9, ['P', 'DET', 'ADJ']]]);
rules['P'] = rules['N'].concat([[3/9, ['P', 'DET', 'N']]]);
rules['P'] = rules['N'].concat([[4/9, ['P', 'N', ',']]]);
rules['P'] = rules['N'].concat([[5/9, ['P', 'N', '.']]]);
rules['P'] = rules['N'].concat([[6/9, ['P', 'N', 'CNJ']]]);
rules['P'] = rules['N'].concat([[7/9, ['P', 'N', 'N']]]);
rules['P'] = rules['N'].concat([[8/9, ['P', 'N', 'P']]]);
rules['P'] = rules['N'].concat([[1, ['P', 'PRO', 'N']]]);
rules['PRO'] = [[1/3, ['PRO', 'ADJ', 'N']]];
rules['PRO'] = rules['PRO'].concat([[2/3, ['PRO', 'MOD', 'V']]]);
rules['PRO'] = rules['PRO'].concat([[1, ['PRO', 'V', 'DET']]]);
rules['TO'] = [[1, ['TO', 'V', 'DET']]];
rules['V'] = [[1/4, ['V', 'DET', 'ADJ']]];
rules['V'] = rules['V'].concat([[2/4, ['V', 'DET', 'N']]]);
rules['V'] = rules['V'].concat([[3/4, ['V', 'P', 'DET']]]);
rules['V'] = rules['V'].concat([[1, ['V', 'VN', 'P']]]);
rules['VD'] = [[1, ['VD', 'DET', 'N']]];
rules['VN'] = [[1, ['VN', 'P', 'DET']]];

function l_transform(text, l_rules) {
	new_text = []
	for (i = 0; i < text.length; i++) {
		ran_num = Math.random();
		transforms = rules[text[i]];
		for(j = 0; j < transforms.length; j++){
			if(ran_num <= transforms[j][0]){
				new_text = new_text.concat(transforms[j][1]);
				break
			}
		}
	}
	return new_text
}

