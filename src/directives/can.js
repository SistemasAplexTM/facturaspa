import { getUser } from '@/utils/auth'
const roles = getUser('roles')
export default {
	inserted (el, binding){
		let show = false
		var data = []
		for (var i = 0; i < roles.length; i++) {
			data = roles[i].permissions.filter(data => data.guard_name == binding.value)
			if (data.length > 0)
				show = true
			
		}
		if (!show)
			document.getElementById(el.id).style.visibility = "hidden"

	}
}
