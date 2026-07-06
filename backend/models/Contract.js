// backend/models/Contract.js
const { supabase } = require('../config/supabase');

class Contract {
  static async create(contractData) {
    const { data, error } = await supabase
      .from('contracts')
      .insert([contractData])
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }

  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id, updateData) {
    const { data, error } = await supabase
      .from('contracts')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }
}

module.exports = Contract;
